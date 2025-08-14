import OpenAI from "openai";

interface RiskslRequest {
  sector: string;
  description: string;
  occupations: string;
}

class GetRisksService {
  async execute({ sector, description, occupations }: RiskslRequest) {
    if (!sector || !occupations || !description) {
      throw new Error(
        "Preencha o setor, descrição e e funções são obrigátorios"
      );
    }
    const client = new OpenAI();

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Você é um assistente que retorna informações sobre riscos no setor ${sector}, ${description ? `descrito: ${description}` : ""}, nesse setor tem as seguintes funções de trabalho: ${occupations}. de acordo com as funções no Brasil.

Sempre responda **exatamente** neste formato Array :

  [{
      "type": "Faça o levantamento de riscos dessa função preenchendo todos os campos abaixo, no tipo ou é Fisico, Quimico, Acidente, Ergonomico ou Biologico", 
      "name": "Nome do risco",
      "description": "Qual é a causa do risco",
        "fonte_geradora": "Fonte Geradora",
            perigos: "Perigos (Atividade e Processo)",
            avaliacao_risco: "Avaliação do Risco (Probabilidade x Severidade)",
            epis: "EPI(s) Recomendado(s)",
            epcs: "EPC(s) Recomendado(s)",
            medidas_controle: "Medidas de Controle Adicional",
  }]
}

Evite variações. Não inclua explicações, apenas o Array válido.
`,
    });

    return JSON.parse(response.output_text);
    /*
    await apiChatgpt
      .post("/customers", {
        name: user.name,
        cpfCnpj: cpf,
        mobilePhone: user.phone_number,
      })
      .then(async (response) => {
        costumer_id = response.data.id;
        await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            costumer_id: costumer_id,
          },
        });
      })
      .catch((e) => {
        throw new Error("Ocorreu um erro ao criar cobrança");
      });

    return occupational;*/
  }
}

export { GetRisksService };
