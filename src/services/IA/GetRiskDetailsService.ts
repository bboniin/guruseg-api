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

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Você é um assistente que retorna informações mais detalhadas sobre risco do setor ${sector}, agente ${name} do tipo ${type}. de acordo com as funções no Brasil.
 Use esses agentes como modelo: 

Possiveis Probabilidades: Não há exposição,Exposição a níveis baixos,Exposição moderada,Exposição elevada,Exposição elevadíssima 
Possiveis Efeitos: Pouca importância,Preocupantes,Severos,Irreversíveis,Ameaça
Possiveis Tipo de Exposição: Eventual/Ocasional,Habitual,Habitual/Intermitente,Habitual/Permanente,Intermitente,N.A.,Não Habitual/Não Permanente,Ocasional,Ocasional/Intermitente,Ocasional/Permanente,Permanente

Sempre responda **exatamente** neste formato Objeto:

  {
      "type": ${type},
      "name": ${name},
      "description": "Atividades e Processos do risco",
      "fonte_geradora": "Fontes Geradora do risco, retorne os elementos separados por vírgula, garantindo que CADA palavra comece com a primeira letra maiúscula (Exemplo: "Computador, Teclado"),
      "perigos": "Perigos do risco",
      "probabilidade": probabilidade,
      "efeito": efeito,
      "tipo_exposicao": tipo de exposição,
      "tempo_exposicao": "Tempo de exposição ao risco,
      "epis": "EPI(s) Recomendado(s)",
      "epcs": "EPC(s) Recomendado(s)",
      "medidas_controle": "Medidas de Controle Adicional",
  }
}

Evite variações. Não inclua explicações, apenas o Objeto válido.
`,
    });

    return JSON.parse(response.output_text);
  }
}

export { GetRiskDetailsService };
