import axios from "axios";
import prismaClient from "../../prisma";

interface JobRequest {
  id: string;
  company_id: string;
  userId: string;
}

class IntegrationJobService {
  async execute({ id, company_id, userId }: JobRequest) {
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
      throw new Error("Empresa não encontrada");
    }

    const employee = await prismaClient.companyEmployees.findUnique({
      where: {
        id: id,
      },
      include: {
        company_sector: true,
      },
    });

    if (!employee) {
      throw new Error("Função não encontrada");
    }

    if (!employee.company_sector) {
      throw new Error("Setor não encontrado");
    }

    if (!employee.company_sector.sgg_id) {
      throw new Error("Vincule primeiro o setor para depois vincular a função");
    }

    if (employee.sgg_id) {
      throw new Error("Função já vinculada ao SGG");
    }

    let error = "";
    let sggId = "";

    await axios
      .post(
        "https://app.sgg.net.br/api/v3/cargo/",
        {
          id_empresa: company.sgg_id,
          id_setor: employee.company_sector.sgg_id,
          setor: employee.company_sector.name,
          cargo: employee.name,
          funcao: employee.name,
          recomendacoes: `EPI´s recomendadas para função: ${employee.epis}`,
          CBO: employee.cbo,
          descricao_atividades: employee.description,
        },
        {
          auth: {
            username: process.env.SGG_USER || "",
            password: "",
          },
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

    await prismaClient.companyEmployees.update({
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

export { IntegrationJobService };
