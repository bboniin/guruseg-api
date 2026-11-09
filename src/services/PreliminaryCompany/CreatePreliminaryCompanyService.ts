import prismaClient from "../../prisma";

interface CreateRequest {
  razao_social: string;
  observation?: string;
  userId?: string;
}

class CreatePreliminaryCompanyService {
  async execute({ razao_social, observation, userId }: CreateRequest) {
    if (!razao_social) {
      throw new Error("Preencha a razão social da empresa.");
    }

    const preliminaryCompany = await prismaClient.preliminaryCompany.create({
      data: {
        razao_social,
        observation: observation || "",
        collaborador_id: userId || "",
        status: "aguardando",
        functions: {
          create: [
            {
              name: "",
              cbo: "",
              quantidade_colaboradores: 1,
              quantidade_colaboradores_m: 1,
              quantidade_colaboradores_f: 0,
              description: "",
              epis: "",
            },
          ],
        },
      },
      include: {
        functions: true,
      },
    });

    return preliminaryCompany;
  }
}

export { CreatePreliminaryCompanyService };
