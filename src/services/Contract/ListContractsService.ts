import prismaClient from "../../prisma";

interface ContractRequest {
  userId: string;
  lead_id: string;
  search: string;
  page: number;
  status: string;
}

class ListContractsService {
  async execute({ userId, lead_id, search, status, page }: ContractRequest) {
    let filter = lead_id
      ? {
          user_id: userId,
          lead_id: lead_id,
        }
      : {
          user_id: userId,
        };

    if (search) {
      filter["name"] = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (status) {
      filter["status"] = status;
    }

    const contracts = await prismaClient.contract.findMany({
      where: filter,
      orderBy: {
        update_at: "desc",
      },
      skip: page * 30,
      take: 30,
    });

    const totalContracts = await prismaClient.contract.count({
      where: filter,
      orderBy: {
        update_at: "desc",
      },
    });

    const totalContractsSigned = await prismaClient.contract.count({
      where: { ...filter, status: "assinado" },
    });
    const totalContractsExpired = await prismaClient.contract.count({
      where: { ...filter, status: "expirado" },
    });
    const totalContractsPedding = await prismaClient.contract.count({
      where: { ...filter, status: "aguardando" },
    });
    const totalContractsNegotion = await prismaClient.contract.count({
      where: { ...filter, status: "negociacao" },
    });
    const totalContractsRecused = await prismaClient.contract.count({
      where: { ...filter, status: "recusado" },
    });

    return {
      contracts,
      totalContracts,
      infosContracts: {
        totalContractsSigned,
        totalContractsExpired,
        totalContractsPedding,
        totalContractsNegotion,
        totalContractsRecused,
      },
    };
  }
}

export { ListContractsService };
