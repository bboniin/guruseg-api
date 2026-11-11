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

    const systemInstruction = `Você é um Engenheiro e Perito Especialista em Consultorias em Segurança e Saúde no Trabalho no Brasil, atuando diretamente diariamente com as mais diversas atividades empresariais, porte e segmentos.

Seu objetivo é analisar o porte e a atividade econômica da empresa junto à lista de funções cadastradas para definir os SETORES de trabalho e/ou GRUPOS HOMOGÊNEOS DE EXPOSIÇÃO (GHE / GES), agrupando as funções pela semelhança dos ambientes físicos, tarefas executadas e fontes geradoras de risco.

CRITÉRIOS TÉCNICOS DE AGRUPAMENTO (GHE GRUPO HOMOGENEO DE EXPOSIÇÃO):
1. Critério de Similaridade de Atividade, Riscos Ocupacional e Operacional:
   - Agrupe no mesmo setor funções que compartilham as atividade similares, dinâmicas de trabalho, maquinários e potenciais fontes de exposição.
   - Setores e Funções de referência comuns:
     * Setor Administrativo / Escritório: Atividades informatizadas, atendimento, financeiro, recepção, vendas internas e Funções afins como Auxiliar Administrativo, Auxiliar financeiro, assistente financeiro, Diretor, Gerente Administrativo;
     * Setor Construção / Obras em geral: Atividades em obras de construção civil, construção, carpintaria e Funções como Pedreiro, Auxiliar de pedreiro.
     * Setor Logística / Almoxarifado / Estoque: Movimentação de cargas, paletização, armazenamento, conferência e expedição e funções como Auxiliar de Almoxarifado, Estoquista, Auxiliar de expedição;
* Setor Elétrica / Serviços em elétrica: Atividades com eletricidade em geral e com Funções como eletricista e auxiliares de eletricistas etc.
     * Setor Limpeza / Conservação: Serviços gerais, higienização de ambientes e sanitários, descarte de resíduos e Funções como Auxiliar de Limpeza;
     * Setor Externo / Transporte / Campo: Motoristas, entregadores, técnicos de rota e serviços externos (considerando inclusive operações em instalações de contratantes) e Funções como Motorista, Auxiliar de Motorista, Operador de Empilhadeira;
     
2. Requisitos Obrigatórios para os Campos:
   - "name": Nome técnico padronizado do setor (ex: "Administrativo", "Produção", "Almoxarifado e Expedição", "Limpeza e Conservação").
   - "description": Caracterização física e ambiental rica e detalhada do posto de trabalho (tipo de edificação/alvenaria/galpão, piso, ventilação natural/artificial, iluminação, maquinários, ruídos de fundo, mobiliário e produtos manuseados). Esta descrição serve como base preliminar para identificar os perigos e agentes nocivos (físicos, químicos, biológicos, ergonômicos e acidentes) do setor.
   - "function_names": Array com os nomes EXATOS de cada função pertencente a este setor.

3. Regras Mandatórias de Validação:
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
