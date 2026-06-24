import axios from "axios";
import prismaClient from "../../prisma";

interface CompanyRequest {
  id: string;
  userId: string;
}

class IntegrationCompanyService {
  async execute({ id, userId }: CompanyRequest) {
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
        id: id,
      },
    });

    if (!company) {
      throw new Error("Formulário não encontrado");
    }

    if (company.sgg_id) {
      throw new Error("Empresa já vinculada ao SGG");
    }

    let error = "";
    let sggId = "";

    await axios
      .post(
        "https://app.sgg.net.br/api/v3/empresa/",
        {
          fantasia: company.nome_fantasia,
          nome: company.razao_social,
          CNPJ: company.cnpj,
          ...(company.nome_responsavel &&
            company.cpf_responsavel && {
              responsaveis: [
                {
                  CPF: company.cpf_responsavel,
                  nome: company.nome_responsavel,
                },
              ],
            }),
        },
        {
          auth: {
            username: process.env.SGG_USER || "",
            password: "",
          },
          responseType: "json",
        },
      )
      .then((response) => {
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

    await prismaClient.company.update({
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

export { IntegrationCompanyService };
