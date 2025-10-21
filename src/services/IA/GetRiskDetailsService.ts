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
        "Preencha o tipo, setor e nome para buscar mais detalhes"
      );
    }
    const client = new OpenAI();

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Você é um assistente que retorna informações mais detalhadas sobre risco do setor ${sector}, chamado ${name} do tipo ${type}. de acordo com as funções no Brasil.

Sempre responda **exatamente** neste formato Objeto:

  {
      "description": "Qual é a causa do risco",
        "fonte_geradora": "Fonte Geradora",
            perigos: "Perigos (Atividade e Processo)",
            avaliacao_risco: "Avaliação do Risco (Probabilidade x Severidade)",
            epis: "EPI(s) Recomendado(s)",
            epcs: "EPC(s) Recomendado(s)",
            medidas_controle: "Medidas de Controle Adicional",
  }
}

Evite variações. Não inclua explicações, apenas o Objeto válido.
`,
    });

    return JSON.parse(response.output_text);
  }
}

export { GetRiskDetailsService };
