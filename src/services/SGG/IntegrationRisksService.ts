import axios from "axios";
import prismaClient from "../../prisma";
import { addYears, format } from "date-fns";

interface RiskRequest {
  id: string;
  company_id: string;
  userId: string;
}

class IntegrationRisksService {
  async execute({ id, company_id, userId }: RiskRequest) {
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

    const sector = await prismaClient.companySector.findUnique({
      where: {
        id: id,
      },
      include: {
        companyScratchs: true,
        companyEmployees: true,
      },
    });

    if (!sector) {
      throw new Error("Setor não encontrado");
    }

    if (!sector.companyScratchs) {
      throw new Error("Nenhum risco encontrado");
    }

    if (!sector.sgg_id) {
      throw new Error(
        "Vincule primeiro o setor para depois vincular os riscos",
      );
    }

    if (sector.sgg_risks_id) {
      throw new Error("Riscos já vinculados ao SGG");
    }

    const cargos = sector.companyEmployees.map((item) => {
      return {
        nome: item.name,
        CBO: item.cbo,
        funcao: item.name,
      };
    });

    const cargosId = sector.companyEmployees.map((item) => {
      return item.sgg_id;
    });

    const riscos = sector.companyScratchs.map((item) => {
      return {
        risco: item.name,
        envia_esocial: "Não",
        matriz_risco: "AIHA",
        perigos: item.perigos,
        tipo_avaliacao: "Qualitativa",
        fontes_geradoras: item.fonte_geradora.split(","),
        dados_adicionais: {
          observacoes: `EPI´s: ${item.epis}\nEPC´s: ${item.epcs}\nMedidas de Controle: ${item.medidas_controle}`,
        },
        tempo_exposicao: {
          tipo: item.tipo_exposicao,
          detalhes: item.tempo_exposicao,
        },
        peso_criterio_nivel_1: item.probabilidade,
        peso_criterio_nivel_2: item.efeito,
      };
    });

    let error = "";
    let sggId = "";

    await axios
      .post(
        "https://app.sgg.net.br/api/v3/avaliacao_de_riscos/",
        {
          empresa: company.sgg_id,
          id_setor: sector.sgg_id,
          ids_cargos: cargosId,
          cargos: cargos,
          data: format(new Date(), "yyyy-MM-dd"),
          data_validade: format(addYears(new Date(), 1), "yyyy-MM-dd"),
          riscos: riscos,
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
        console.log(error);
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
        sgg_risks_id: sggId,
      },
    });
  }
}

export { IntegrationRisksService };
