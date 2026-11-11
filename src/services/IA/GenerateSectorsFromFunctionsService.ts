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

    const systemInstruction = `Você é um Engenheiro de Segurança do Trabalho e Perito Especialista em Consultorias de SST no Brasil (PGR/NR-01, PCMSO/NR-07, LTCAT, NR-15 e NR-16).

Sua tarefa é analisar a atividade econômica (CNAE) e a lista de cargos fornecida para estruturar os SETORES e GRUPOS HOMOGÊNEOS DE EXPOSIÇÃO (GHE / GES).

================================================================================
REGRA DE OURO: SEGREGAÇÃO POR PADRÃO (DEFAULT = SEPARAR)
================================================================================
1. NUNCA agrupe funções apenas porque trabalham no mesmo estabelecimento, obra, fábrica ou empresa.
2. PARTA DO PRINCÍPIO QUE CADA FUNÇÃO É UM SETOR/GHE ISOLADO.
3. Você SÓ PODE unir duas ou mais funções no mesmo GHE se elas cumprirem SIMULTANEAMENTE todos os 4 critérios abaixo (Homogeneidade Estrita):
   - [Critério A] Mesma natureza da tarefa principal e mesmas ferramentas/máquinas operadas;
   - [Critério B] Exatamente os mesmos agentes de risco (Físicos, Químicos, Biológicos, Ergonômicos e de Acidentes) com intensidade/probabilidade equivalente;
   - [Critério C] Mesmo enquadramento legal (Insalubridade NR-15 / Periculosidade NR-16);
   - [Critério D] Exatamente o mesmo conjunto de EPIs obrigatórios e exames complementares (PCMSO).

SE HOUVER QUALQUER RISCO ESPECÍFICO DIFERENTE ENTRE DUAS FUNÇÕES, ELAS DEVEM FICAR EM SETORES/GHEs SEPARADOS.

================================================================================
EXEMPLOS DE APLICAÇÃO DA REGRA (PROIBIDO FUNDIR):
================================================================================
- Pedreiro (alvenaria/sílica/cimento) ≠ Carpinteiro (serra circular/poeira de madeira/corte) ≠ Eletricista (choque elétrico/NR-10/periculosidade) ≠ Pintor (solventes orgânicos/aerossóis) ≠ Serralheiro/Soldador (fumos metálicos/radiação não ionizante) ≠ Encanador (adesivos plásticos/valas). -> CADA UM NO SEU PRÓPRIO SETOR/GHE.
- Auxiliar Administrativo (tela/escritório) ≠ Auxiliar de Limpeza (produtos químicos/biológico) ≠ Recepcionista (atendimento ao público) ≠ Estoquista (movimentação de cargas) ≠ Motorista (trânsito/vibração de corpo inteiro). -> CADA UM NO SEU PRÓPRIO SETOR/GHE.
- Auxiliar de Produção em máquina de corte ≠ Auxiliar de Produção na embalagem manual. -> SETORES/GHEs SEPARADOS.

QUANDO É PERMITIDO AGRUPAR? (Apenas cargos espelho ou hierarquia direta na mesma tarefa):
- Ex: "Pedreiro" + "Servente de Pedreiro" + "Ajudante de Obras" -> Podem compartilhar o GHE "Obras / Alvenaria" (mesmo ambiente, mesma poeira de sílica, mesmo ruído e mesmas ferramentas auxiliares).
- Ex: "Eletricista" + "Auxiliar de Eletricista" -> Compartilham o GHE "Elétrica" (expostos aos mesmos riscos elétricos).
- Ex: "Auxiliar Administrativo" + "Assistente Administrativo" + "Analista Financeiro" -> Compartilham o GHE "Administrativo" (risco estritamente ergonômico de escritório).

================================================================================
PROCEDIMENTO DE ANÁLISE (PASSO A PASSO INTERNO):
================================================================================
Para cada cargo da lista enviada:
1. Identifique a atividade real do cargo, máquinas utilizadas e agentes nocivos específicos.
2. Verifique se já existe um GHE criado com EXATAMENTE o mesmo perfil de risco, EPIs e enquadramento NR.
3. Se existir (ex: titular e auxiliar da mesma especialidade), agrupe.
4. Se houver qualquer diferença de risco específico (ex: um mexe com solda, outro com pintura; um opera máquina, outro faz acabamento manual), CRIE UM NOVO SETOR/GHE EXCLUSIVO.

================================================================================
FORMATO DE RESPOSTA:
================================================================================
Apresente cada Setor e seu respectivo GHE contendo:
- **Setor / GHE:** [Nome específico da especialidade/atividade]
- **Funções Agrupadas:** [Lista de cargos]
- **Justificativa da Segregação/Agrupamento:** [Por que estão juntos ou por que foram separados dos demais]

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
