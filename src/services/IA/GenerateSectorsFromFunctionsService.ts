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
  async execute({ company, functions }: GenerateSectorsRequest): Promise<SectorGenerated[]> {
    if (!functions || functions.length === 0) {
      throw new Error("É necessário fornecer ao menos uma função para gerar os setores.");
    }

    const client = new OpenAI();

    const systemInstruction = `Você é um Engenheiro e Perito Especialista em Segurança e Saúde no Trabalho no Brasil, especialista em NR-01, PGR (Programa de Gerenciamento de Riscos), PCMSO e eSocial.
Seu objetivo é analisar os dados cadastrais da empresa e a lista de funções fornecidas, e criar os setores de trabalho ideais para a empresa, agrupando as funções de acordo com a semelhança dos ambientes físicos de trabalho e os Grupos Homogêneos de Exposição (GHE).

Regras de Especialista em Segurança do Trabalho:
1. Analise cuidadosamente o ramo de atividade da empresa e cada função (nome, descrição das atividades, CBO, EPIs).
2. Defina os setores ideais (pode ser 1, 2, 3 ou mais setores, conforme achar estritamente necessário segundo as melhores práticas de SST):
   - Funções de trabalho em escritório, computadores, administrativo, financeiro, vendas internas, atendimento -> agrupadas em um setor administrativo (ex: "Administrativo" ou "Escritório").
   - Funções operacionais, chão de fábrica, produção, montagem, máquinas -> agrupadas em setor operacional (ex: "Operacional" ou "Produção").
   - Funções de estoque, almoxarifado, expedição, logística -> agrupadas em setor específico (ex: "Almoxarifado" ou "Logística e Expedição").
   - Funções externas, transporte, motoristas, entregas -> agrupadas em setor correspondente (ex: "Transporte e Entregas" ou "Externo / Campo").
   - Se todas as funções pertencerem ao mesmo ambiente físico (ex: todas são de escritório), crie apenas 1 setor adequado.
3. Para cada setor gerado:
   - "name": Nome técnico claro do setor (Ex: "Administrativo", "Operacional", "Almoxarifado", "Transporte").
   - "description": Descrição técnica rica e detalhada do ambiente físico deste setor (tipo de edificação, piso, iluminação, ventilação, maquinários, ruídos, mobiliário e características físicas do posto de trabalho). Esta descrição detalhada é indispensável para que o sistema consiga mapear corretamente os riscos ocupacionais (físicos, químicos, biológicos, ergonômicos e acidentes) do setor.
   - "function_names": Array com os nomes EXATOS das funções que trabalham neste setor.
4. TODAS as funções da lista fornecida devem ser alocadas em exatamente um setor. Nenhuma função pode ficar de fora.`;

    const userPrompt = `DADOS DA EMPRESA:
Razão Social: ${company.razao_social || "Não informada"}
Nome Fantasia: ${company.nome_fantasia || company.razao_social || "Não informado"}
Ramo de Atividade: ${company.ramo_atividade || "Não informado"}

LISTA DE FUNÇÕES CADASTRADAS:
${functions
  .map(
    (f, idx) =>
      `${idx + 1}. Nome: "${f.name}" | CBO: ${f.cbo || "Não informado"} | Descrição: ${
        f.description || "Sem descrição informada"
      } | EPIs: ${f.epis || "Nenhum"}`
  )
  .join("\n")}

Crie os setores ideais e distribua todas as funções acima nos setores correspondentes.`;

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
                      description: "Nome técnico do setor (Ex: Administrativo, Operacional, Almoxarifado).",
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
