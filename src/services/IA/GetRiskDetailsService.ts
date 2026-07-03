import OpenAI from "openai";

interface RiskRequest {
  type: string;
  name: string;
  sector: string;
}

class GetRiskDetailsService {
  async execute({ type, name, sector }: RiskRequest) {
    if (!type || !name || !sector) {
      throw new Error(
        "Preencha o tipo, setor e nome para buscar mais detalhes",
      );
    }

    const client = new OpenAI();

    const PROBABILIDADES = [
      "Não há exposição",
      "Exposição a níveis baixos",
      "Exposição moderada",
      "Exposição elevada",
      "Exposição elevadíssima",
    ];
    const EFEITOS = [
      "Pouca importância",
      "Preocupantes",
      "Severos",
      "Irreversíveis",
      "Ameaça",
    ];
    const TIPOS_EXPOSICAO = [
      "Eventual/Ocasional",
      "Habitual",
      "Habitual/Intermitente",
      "Habitual/Permanente",
      "Intermitente",
      "N.A.",
      "Não Habitual/Não Permanente",
      "Ocasional",
      "Ocasional/Intermitente",
      "Ocasional/Permanente",
      "Permanente",
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um perito engenheiro de segurança do trabalho no Brasil especialista em PGR e eSocial. Seu objetivo é detalhar os riscos ocupacionais solicitados.",
        },
        {
          role: "user",
          content: `Retorne informações detalhadas sobre o risco no setor "${sector}". Agente nocivo: "${name}". Tipo de risco: "${type}".`,
        },
      ],

      response_format: {
        type: "json_schema",
        json_schema: {
          name: "detalhes_do_risco",
          strict: true,
          schema: {
            type: "object",
            properties: {
              tipo: {
                type: "string",
                enum: [type],
                description: "O tipo do risco passado na requisição.",
              },
              name: {
                type: "string",
                enum: [name],
                description: "O nome do agente passado na requisição.",
              },
              description: {
                type: "string",
                description: "Atividades e Processos detalhados do risco.",
              },
              fonte_geradora: {
                type: "string",
                description:
                  "Fontes Geradoras separadas por vírgula. Cada palavra deve começar com letra maiúscula. Exemplo: 'Computador, Teclado'.",
              },
              perigos: {
                type: "string",
                description: "Perigos associados ao risco.",
              },
              probabilidade: { type: "string", enum: PROBABILIDADES },
              efeito: { type: "string", enum: EFEITOS },
              tipo_exposicao: { type: "string", enum: TIPOS_EXPOSICAO },
              tempo_exposicao: {
                type: "string",
                description: "Tempo estimado de exposição ao risco.",
              },
              epis: { type: "string", description: "EPI(s) Recomendado(s)" },
              epcs: { type: "string", description: "EPC(s) Recomendado(s)" },
              medidas_controle: {
                type: "string",
                description: "Medidas de Controle Adicional",
              },
            },
            required: [
              "tipo",
              "name",
              "description",
              "fonte_geradora",
              "perigos",
              "probabilidade",
              "efeito",
              "tipo_exposicao",
              "tempo_exposicao",
              "epis",
              "epcs",
              "medidas_controle",
            ],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.1,
    });

    const risco = JSON.parse(response.choices[0].message.content || "{}");
    risco.type = risco.tipo;
    console.log(risco);
    return risco;
  }
}

export { GetRiskDetailsService };
