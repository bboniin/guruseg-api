import prismaClient from "../../prisma";

interface ContractRequest {
  user_id: string;
  userId: string;
  search: string;
  page: number;
}

class AdminListContractsService {
  async execute({ user_id, userId, search, page }: ContractRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    let filter = {
      user_id: user_id,
    };

    if (search) {
      filter["name"] = {
        contains: search,
        mode: "insensitive",
      };
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

export { AdminListContractsService };
