import OpenAI from "openai";

interface OccupationalRequest {
  name: string;
}

class GetOccupationalService {
  async execute({ name }: OccupationalRequest) {
    if (!name) {
      throw new Error("Preencher a função é obrigátorio");
    }
    const client = new OpenAI();

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Você é um assistente que retorna informações sobre ocupações de trabalho no Brasil.

Sempre responda **exatamente** neste formato JSON:
{
  "name": "Nome da função com iniciais maiúsculas",
  "description": "Resumo da atividade principal da função.",
  "epis": EPI 1, EPI 2, EPI 3...
  "cbo": "0000-00" de acordo e atualizado no brasil, 
}

Evite variações. Não inclua explicações, apenas o JSON válido.

A função é ${name}`,
    });

    return JSON.parse(response.output_text);
  }
}

export { GetOccupationalService };
