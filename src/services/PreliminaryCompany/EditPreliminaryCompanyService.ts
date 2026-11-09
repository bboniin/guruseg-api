import prismaClient from "../../prisma";

interface FunctionItem {
  id?: string;
  name: string;
  cbo?: string;
  quantidade_colaboradores?: number | string;
  quantidade_colaboradores_m?: number | string;
  quantidade_colaboradores_f?: number | string;
  description?: string;
  epis?: string;
}

interface EditRequest {
  company_id: string;
  razao_social?: string;
  nome_fantasia?: string;
  cnpj?: string;
  type?: string;
  ramo_atividade?: string;
  cep?: string;
  endereco?: string;
  nome_responsavel?: string;
  cpf_responsavel?: string;
  contato_responsavel?: string;
  observation?: string;
  status?: string;
  functions?: FunctionItem[];
  deleteFunctions?: string[];
}

class EditPreliminaryCompanyService {
  async execute({
    company_id,
    razao_social,
    nome_fantasia,
    cnpj,
    type,
    ramo_atividade,
    cep,
    endereco,
    nome_responsavel,
    cpf_responsavel,
    contato_responsavel,
    observation,
    status,
    functions,
    deleteFunctions,
  }: EditRequest) {
    if (!company_id) {
      throw new Error("ID do formulário não fornecido.");
    }

    const companyGet = await prismaClient.preliminaryCompany.findUnique({
      where: { id: company_id },
      include: { functions: true },
    });

    if (!companyGet) {
      throw new Error("Formulário preliminar não encontrado.");
    }

    // 1. Delete explicitly requested functions
    if (deleteFunctions && deleteFunctions.length > 0) {
      await prismaClient.preliminaryFunction.deleteMany({
        where: {
          preliminary_company_id: company_id,
          id: { in: deleteFunctions },
        },
      });
    }

    // 2. Synchronize functions if functions array was provided
    if (Array.isArray(functions)) {
      const existingFunctionIds = companyGet.functions.map((f) => f.id);
      const incomingValidIds = functions
        .map((f) => f.id)
        .filter((id): id is string => Boolean(id && existingFunctionIds.includes(id)));

      // Remove functions that were deleted in the frontend
      const idsToDelete = existingFunctionIds.filter((id) => !incomingValidIds.includes(id));
      if (idsToDelete.length > 0) {
        await prismaClient.preliminaryFunction.deleteMany({
          where: {
            preliminary_company_id: company_id,
            id: { in: idsToDelete },
          },
        });
      }

      // Upsert / Create / Update each function
      for (const func of functions) {
        const funcData = {
          preliminary_company_id: company_id,
          name: func.name || "",
          cbo: func.cbo ? String(func.cbo).trim() : "",
          quantidade_colaboradores: parseInt(String(func.quantidade_colaboradores), 10) || 0,
          quantidade_colaboradores_m: parseInt(String(func.quantidade_colaboradores_m), 10) || 0,
          quantidade_colaboradores_f: parseInt(String(func.quantidade_colaboradores_f), 10) || 0,
          description: func.description || "",
          epis: func.epis || "",
        };

        if (func.id && existingFunctionIds.includes(func.id)) {
          await prismaClient.preliminaryFunction.update({
            where: { id: func.id },
            data: funcData,
          });
        } else {
          await prismaClient.preliminaryFunction.create({
            data: funcData,
          });
        }
      }
    }

    // 3. Update preliminary company info
    const updatedCompany = await prismaClient.preliminaryCompany.update({
      where: { id: company_id },
      data: {
        razao_social: razao_social !== undefined ? razao_social : companyGet.razao_social,
        nome_fantasia: nome_fantasia !== undefined ? nome_fantasia : companyGet.nome_fantasia,
        cnpj: cnpj !== undefined ? cnpj : companyGet.cnpj,
        type: type !== undefined ? (type === "CAEPF" ? "CAEPF" : "CNPJ") : companyGet.type,
        ramo_atividade: ramo_atividade !== undefined ? ramo_atividade : companyGet.ramo_atividade,
        cep: cep !== undefined ? cep : companyGet.cep,
        endereco: endereco !== undefined ? endereco : companyGet.endereco,
        nome_responsavel: nome_responsavel !== undefined ? nome_responsavel : companyGet.nome_responsavel,
        cpf_responsavel: cpf_responsavel !== undefined ? cpf_responsavel : companyGet.cpf_responsavel,
        contato_responsavel: contato_responsavel !== undefined ? contato_responsavel : companyGet.contato_responsavel,
        observation: observation !== undefined ? observation : companyGet.observation,
        status: status !== undefined ? status : companyGet.status,
      },
      include: {
        functions: {
          orderBy: {
            create_at: "asc",
          },
        },
      },
    });

    return updatedCompany;
  }
}

export { EditPreliminaryCompanyService };
