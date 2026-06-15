import axios from "axios";
import prismaClient from "../../prisma";

interface SectorRequest {
  id: string;
  company_id: string;
  userId: string;
}

class IntegrationSectorService {
  async execute({ id, userId, company_id }: SectorRequest) {
    const collaborator = await prismaClient.collaborator.findUnique({
      where: {
        id: userId,
      },
    });

    if (!collaborator) {
      throw new Error("Técnico não encontrado");
    }

    const company = await prismaClient.company.findUnique({
      where: {
        id: company_id,
      },
    });

    if (!company) {
      throw new Error("Formulário não encontrado");
    }

    if (!company.sgg_id) {
      throw new Error(
        "Vincule primeiro a empresa para depois vincular o setor",
      );
    }

    const sector = await prismaClient.companySector.findUnique({
      where: {
        id: id,
      },
    });

    if (!sector) {
      throw new Error("Setor não encontrado");
    }

    if (sector.sgg_id) {
      throw new Error("Setor já vinculada ao SGG");
    }

    let error = "";
    let sggId = "";

    await axios
      .post(
        "https://app.sgg.net.br/api/v3/setor/",
        {
          id_empresa: company.sgg_id,
          setor: sector.name,
          descricao_ambiente: sector.description,
          localAmb: 1,
        },
        {
          auth: {
            username: process.env.SGG_USER || "",
            password: "",
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        const returnJSON = JSON.parse(
          response.data.replace(/"({.*?})"/g, (match, p1) => {
            return JSON.stringify(p1);
          }),
        );
        const returnData = JSON.parse(returnJSON.returnInfo);
        if (returnData.erro) {
          error = returnData.msg;
          throw new Error(returnData.msg);
        }

        sggId = returnData.id;
      })
      .catch((error) => {
        error = error.message;
      });

    if (error) {
      throw new Error(error);
    }

    await prismaClient.companySector.update({
      where: {
        id: id,
      },
      data: {
        sgg_id: sggId,
      },
    });

    return 200;
  }
}

export { IntegrationSectorService };
