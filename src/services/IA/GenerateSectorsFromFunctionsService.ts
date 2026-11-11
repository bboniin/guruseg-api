import OpenAI from "openai";

interface FunctionItem {
  id?: string;
  name: string;
  cbo?: string;
  quantidade_colaboradores?: number | string;
  quantidade_colaboradores_m?: number | string;
  quantidade_colaboradores_f?: number | string;
  description?: string;
  epis?: string;
}

interface GenerateSectorsRequest {
  company: {
    razao_social?: string;
    nome_fantasia?: string;
    ramo_atividade?: string;
    type?: string;
  };
  functions: FunctionItem[];
}

interface SectorGenerated {
  name: string;
  description: string;
  function_names: string[];
}

class GenerateSectorsFromFunctionsService {
  async execute({
    company,
    functions,
  }: GenerateSectorsRequest): Promise<SectorGenerated[]> {
    if (!functions || functions.length === 0) {
      throw new Error(
        "É necessário fornecer ao menos uma função para gerar os setores.",
      );
    }

    const client = new OpenAI();

    const systemInstruction = `Você é um Engenheiro de Segurança do Trabalho e Perito Especialista em Consultorias de SST no Brasil, com sólida atuação na elaboração de PGR (NR-01), PCMSO (NR-07) e LTCAT/Laudos de Periculosidade e Insalubridade (NR-15, NR-16).

Seu objetivo é analisar o porte e a atividade econômica da empresa (CNAE) juntamente com a lista de funções cadastradas, definindo os SETORES de trabalho e/ou GRUPOS HOMOGÊNEOS DE EXPOSIÇÃO (GHE / GES).

### PRINCÍPIO PERICIAL MANDATÓRIO PARA GHE:
Em SST, a definição de GHE/GES não se baseia apenas no "macroambiente físico" onde o trabalhador transita, mas sim na SIMILARIDADE REAL DO PERFIL DE EXPOSIÇÃO AOS FATORES DE RISCO, medidas de controle (EPI/EPC), exames complementares e enquadramentos legais.

HIERARQUIA DE CLASSIFICAÇÃO (Ordem obrigatória de decisão):
1º PREVALÊNCIA DA FONTE GERADORA DE RISCO CRÍTICO E REGULAMENTAÇÃO ESPECÍFICA (Ex: NR-10, NR-13, Periculosidade/Insalubridade).
2º NATUREZA DA TAREFA EXECUTADA E MÁQUINAS/FERRAMENTAS UTILIZADAS.
3º AMBIENTE FÍSICO / LOCAL DE TRABALHO.

---

### REGRAS CRÍTICAS DE SEGREGAÇÃO E NÃO-SOBREPOSIÇÃO (ANTI-ERROS):

1. REGRA MANDATÓRIA DE ELÉTRICA (NR-10 / NR-16):
   - NUNCA agrupe funções de eletricidade no setor de "Construção / Obras" ou "Manutenção Predial Geral", mesmo que atuem dentro de um canteiro de obras.
   - Qualquer cargo/função que execute instalações, manutenções ou intervenções elétricas (ex: Eletricista, Auxiliar de Eletricista, Meio Oficial Eletricista, Eletrotécnico, Eletromecânico) DEVE pertencer estritamente ao Setor/GHE: "Elétrica / Serviços em Eletricidade".
   - Motivo pericial: Risco específico de choque elétrico, arco elétrico, queima, exigência de EPIs dielétricos (ATPV, calçado sem metal), NR-10 e periculosidade (Art. 193 CLT).

2. REGRA DO SETOR CONSTRUÇÃO / OBRAS (NR-18):
   - Exclusivo para funções de alvenaria, estrutura, acabamento civil e movimentação de terra (ex: Pedreiro, Servente de Obras, Carpinteiro, Armador, Gesseiro, Pintor de Obras).
   - O risco preponderante é sílica/poeiras minerais, ruído contínuo, queda em nível/altura e esforço físico.

3. REGRA DE LOGÍSTICA/ESTOQUE vs. TRANSPORTE EXTERNO:
   - Funções internas de armazém/estoque (Estoquista, Auxiliar de Almoxarifado, Conferente) NUNCA devem ser agrupadas com funções de transporte em via pública (Motorista, Entregador, Motoboy).
   - Operadores de Empilhadeira devem ter GHE próprio ou ficar no setor de Logística Interna, jamais no setor Externo/Transporte.

4. REGRA DE LIMPEZA E CONSERVAÇÃO:
   - Auxiliar de Limpeza e Serviços Gerais NUNCA devem ser colocados no setor Administrativo, mesmo limpando escritórios. Devem ficar no setor "Limpeza e Conservação" devido à exposição a agentes químicos de limpeza (domissanitários) e biológicos (higienização de sanitários/descarte de lixo).

5. REGRA DE ESCRITÓRIO / ADMINISTRATIVO:
   - Exclusivo para atividades estritamente informatizadas, burocráticas, comerciais ou de gestão com exposição quase nula a riscos físicos/químicos/biológicos (apenas riscos ergonômicos e de acidentes leves).

---

### SETORES E GHEs DE REFERÊNCIA PADRONIZADOS:

* Setor Administrativo / Escritório:
  - Atividades: Informatizadas, financeiro, recepção, gestão, vendas internas.
  - Funções típicas: Auxiliar/Assistente Administrativo, Analista Financeiro, Diretor, Gerente, Recepcionista.

* Setor Construção Civil / Obras:
  - Atividades: Alvenaria, carpintaria de formas, armação de ferragens, concretagem, demolição.
  - Funções típicas: Pedreiro, Servente de Pedreiro, Carpinteiro, Armador, Ajudante de Obras.

* Setor Elétrica / Instalações Elétricas:
  - Atividades: Montagem de quadros, passagem de cabeamento, manutenção elétrica, intervenção em circuitos energizados/desenergizados.
  - Funções típicas: Eletricista, Eletricista de Manutenção, Auxiliar de Eletricista, Eletrotécnico.

* Setor Logística / Almoxarifado / Estoque:
  - Atividades: Paletização, movimentação interna de cargas, armazenagem, conferência de materiais.
  - Funções típicas: Estoquista, Almoxarife, Auxiliar de Expedição, Operador de Empilhadeira.

* Setor Externo / Transporte / Trânsito:
  - Atividades: Condução de veículos em vias públicas, entrega de mercadorias, rotas de atendimento externo.
  - Funções típicas: Motorista de Caminhão, Motorista Entregador, Motoboy, Ajudante de Carga e Descarga Externo.

* Setor Limpeza / Conservação:
  - Atividades: Varrição, recolhimento de resíduos, lavação de pisos, higienização de banheiros e copas.
  - Funções típicas: Auxiliar de Limpeza, Servente de Limpeza, Zelador.

---

### FORMATO DE RESPOSTA ESPERADO:
Para a lista de funções e atividade econômica fornecida, apresente a divisão agrupando por:
1. Nome do Setor / GHE sugerido.
2. Funções vinculadas àquele GHE.
3. Justificativa Técnica do Agrupamento (principais riscos e fontes geradoras comuns que validam a homogeneidade).

4. Requisitos Obrigatórios para os Campos:
   - "name": Nome técnico padronizado do setor (ex: "Administrativo", "Produção", "Almoxarifado e Expedição", "Limpeza e Conservação").
   - "description": Caracterização física e ambiental rica e detalhada do posto de trabalho (tipo de edificação/alvenaria/galpão, piso, ventilação natural/artificial, iluminação, maquinários, ruídos de fundo, mobiliário e produtos manuseados). Esta descrição serve como base preliminar para identificar os perigos e agentes nocivos (físicos, químicos, biológicos, ergonômicos e acidentes) do setor.
   - "function_names": Array com os nomes EXATOS de cada função pertencente a este setor.

5. Regras Mandatórias de Validação:
   - TODAS as funções da lista devem ser alocadas em EXATAMENTE UM setor CONDIZENTE COM SUA NOMECLATURA E ATIVIDAED. Nenhuma função pode ser esquecida ou duplicada.
   - Mantenha a grafia idêntica do nome da função enviada no prompt.
   - Exclua qualquer menção a riscos psicossociais das descrições ambientais (estes são avaliados em instrumento separado).`;

    const userPrompt = `DADOS DA EMPRESA:
Razão Social: ${company.razao_social || "Não informada"}
Nome Fantasia: ${company.nome_fantasia || company.razao_social || "Não informado"}
Ramo de Atividade / CNAE: ${company.ramo_atividade || "Não informado"}

LISTA DE FUNÇÕES CADASTRADAS:
${functions
  .map(
    (f, idx) =>
      `${idx + 1}. Função: "${f.name}"
   - CBO: ${f.cbo || "Não informado"}
   - Colaboradores: Total: ${f.quantidade_colaboradores ?? "N/D"} (M: ${f.quantidade_colaboradores_m ?? "N/D"} | F: ${f.quantidade_colaboradores_f ?? "N/D"})
   - Descrição das atividades: ${f.description || "Sem descrição informada"}
   - EPIs cadastrados: ${f.epis || "Nenhum"}`,
  )
  .join("\n\n")}

Com base nas atividades, ambientes prováveis e semelhança de exposição aos riscos ocupacionais (GHE), crie os setores ideais, formule a descrição física detalhada de cada ambiente e distribua 100% das funções acima sem omitir nenhuma.`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "gerar_setores_trabalho",
          strict: true,
          schema: {
            type: "object",
            properties: {
              setores: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description:
                        "Nome técnico do setor (Ex: Administrativo, Operacional, Almoxarifado).",
                    },
                    description: {
                      type: "string",
                      description:
                        "Descrição técnica detalhada do ambiente físico, piso, iluminação, ventilação e maquinários do setor.",
                    },
                    function_names: {
                      type: "array",
                      items: { type: "string" },
                      description: "Nomes das funções alocadas a este setor.",
                    },
                  },
                  required: ["name", "description", "function_names"],
                  additionalProperties: false,
                },
              },
            },
            required: ["setores"],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.2,
    });

    const parsed = JSON.parse(response.choices[0].message.content || "{}");
    const rawSetores: SectorGenerated[] = parsed.setores || [];

    if (!Array.isArray(rawSetores) || rawSetores.length === 0) {
      // Fallback de segurança se a IA não retornar nenhum setor
      return [
        {
          name: "Geral / Operacional",
          description:
            "Ambiente com instalações gerais de trabalho, iluminação mista, ventilação natural e postos de trabalho para execução das atividades da empresa.",
          function_names: functions.map((f) => f.name),
        },
      ];
    }

    return rawSetores;
  }
}

export { GenerateSectorsFromFunctionsService };
