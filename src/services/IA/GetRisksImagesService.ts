import OpenAI from "openai";

interface RisksRequest {
  images: string;
}

class GetRisksImagesService {
  async execute({ images }: RisksRequest) {
    if (!images) {
      throw new Error("Preencha as imagens do setor para obter mais detalhes");
    }
    const client = new OpenAI();

    let imagesGtp = [];

    images.split(",").map((item) => {
      imagesGtp.push({ type: "input_image", image_url: item, detail: "high" });
    });

    const response = await client.responses.create({
      model: "gpt-4.1",

      input: [
        {
          role: "user",
          content: [
            ...imagesGtp,
            {
              type: "input_text",
              text: `Você é um assistente que retorna informações sobre riscos no setor de trabalho de acordo com as imagens passadas.

Sempre responda **exatamente** neste formato Array :

  [{
      "type": "Faça o levantamento de riscos dessa função preenchendo todos os campos abaixo, no tipo ou é Fisico, Quimico, Acidente, Ergonomico ou Biologico", 
      "name": "Nome do risco",
      "description": "Qual é a causa do risco",
      "fonte_geradora": "Fonte Geradora",
      "perigos": "Perigos (Atividade e Processo)",
      "avaliacao_risco": "Avaliação do Risco (Probabilidade x Severidade)",
      "tempo_exposicao": "Tempo de exposição ao risco",
      "epis": "EPI(s) Recomendado(s)",
      "epcs": "EPC(s) Recomendado(s)",
      "medidas_controle": "Medidas de Controle Adicional"
  }]

Evite variações. Não inclua explicações, apenas o Array válido.
            `,
            },
          ],
        },
      ],
    });
    return JSON.parse(response.output_text);
  }
}

export { GetRisksImagesService };
