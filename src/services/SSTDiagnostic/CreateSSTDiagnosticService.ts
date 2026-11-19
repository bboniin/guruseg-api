import prismaClient from "../../prisma";

interface CreateSSTDiagnosticRequest {
  userId: string;
  company_name: string;
  employees_count?: string | number;
  assessment_date?: string;
  franchisee_name?: string;
  franchisee_phone?: string;
  franchisee_email?: string;
  answers?: any;
  stats?: any;
  cost?: number | string;
}

class CreateSSTDiagnosticService {
  async execute({
    userId,
    company_name,
    employees_count,
    assessment_date,
    franchisee_name,
    franchisee_phone,
    franchisee_email,
    answers,
    stats,
    cost,
  }: CreateSSTDiagnosticRequest) {
    if (!userId) {
      throw new Error("Usuário é obrigatório");
    }

    if (!company_name) {
      throw new Error("Nome da empresa é obrigatório");
    }

    const userExists = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    const isProspect = Boolean(userExists.sst_prospect_enabled);
    let DIAGNOSTIC_COST = isProspect ? 0 : 4.97;

    if (!isProspect && cost !== undefined && cost !== null && cost !== "") {
      const parsedCost = Number(cost);
      if (!isNaN(parsedCost)) {
        DIAGNOSTIC_COST = Math.max(0, parseFloat(parsedCost.toFixed(2)));
      }
    }

    if (DIAGNOSTIC_COST > 0 && userExists.balance < DIAGNOSTIC_COST) {
      throw new Error(
        `Saldo insuficiente para solicitar o Diagnóstico SST (Custo: R$ ${DIAGNOSTIC_COST.toFixed(
          2
        ).replace(".", ",")}). Efetue um depósito para continuar.`
      );
    }

    const answersString =
      typeof answers === "object" ? JSON.stringify(answers) : answers || "";
    const statsString =
      typeof stats === "object" ? JSON.stringify(stats) : stats || "";

    const diagnostic = await prismaClient.sSTDiagnostic.create({
      data: {
        user_id: userId,
        company_name,
        employees_count: employees_count ? String(employees_count) : "",
        assessment_date: assessment_date || "",
        franchisee_name: franchisee_name || userExists.name || "",
        franchisee_phone: franchisee_phone || userExists.phone_number || "",
        franchisee_email: franchisee_email || userExists.email || "",
        answers: answersString,
        stats: statsString,
        cost: DIAGNOSTIC_COST,
      },
    });

    const newBalance =
      DIAGNOSTIC_COST > 0
        ? parseFloat((userExists.balance - DIAGNOSTIC_COST).toFixed(2))
        : userExists.balance;

    if (DIAGNOSTIC_COST > 0) {
      await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          balance: newBalance,
        },
      });
    }

    let description = "DIAGNOSTICO SST";
    if (isProspect) {
      description = "DIAGNOSTICO SST (PROSPECT)";
    } else if (DIAGNOSTIC_COST === 0) {
      description = "DIAGNOSTICO SST (ISENTO)";
    } else if (DIAGNOSTIC_COST < 4.97) {
      description = "DIAGNOSTICO SST (DESCONTO)";
    }

    const payment = await prismaClient.payment.create({
      data: {
        value: DIAGNOSTIC_COST,
        status: "confirmado",
        method: "SALDO",
        type: "DIAGNOSTICO_SST",
        description,
        diagnostic_id: diagnostic.id,
        user_id: userId,
      },
    });

    return {
      ...diagnostic,
      payment_id: payment.id,
      cost: DIAGNOSTIC_COST,
      is_prospect: isProspect,
      new_balance: newBalance,
      answers: answers || (answersString ? JSON.parse(answersString) : {}),
      stats: stats || (statsString ? JSON.parse(statsString) : {}),
    };
  }
}

export { CreateSSTDiagnosticService };
