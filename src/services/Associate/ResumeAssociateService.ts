import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface AssociateRequest {
  userId: string;
  startDate: string;
  endDate: string;
}

class ResumeAssociateService {
  async execute({ userId, startDate, endDate }: AssociateRequest) {
    const associate = await prismaClient.associate.findUnique({
      where: {
        id: userId,
      },
      include: {
        payments: true,
      },
    });

    if (!associate) {
      throw new Error("Associado não encontrado");
    }

    if (!startDate || !endDate) {
      throw new Error("Selecione o periodo");
    }

    const totalLeadsCreated = await prismaClient.leadMaster.count({
      where: {
        associate_id: userId,
      },
    });

    const totalPayments = associate.payments;

    const totalPaymentsValue = totalPayments.reduce((acc, payment) => {
      return acc + payment.value;
    }, 0);

    const leadsPeriodCreated = await prismaClient.leadMaster.count({
      where: {
        associate_id: userId,
        AND: [
          {
            create_at: {
              gte: startOfDay(new Date(startDate)),
            },
          },
          {
            create_at: {
              lte: endOfDay(new Date(endDate)),
            },
          },
        ],
      },
    });

    const leadsPeriodUpdate = await prismaClient.leadMaster.findMany({
      where: {
        associate_id: userId,
        AND: [
          {
            update_at: {
              gte: startOfDay(new Date(startDate)),
            },
          },
          {
            update_at: {
              lte: endOfDay(new Date(endDate)),
            },
          },
        ],
      },
      include: {
        leads: true,
      },
    });

    const totalLeadsPendente = leadsPeriodUpdate.filter(
      (lead) => !lead.leads.length,
    ).length;

    const totalLeadsOportunidade = leadsPeriodUpdate.filter(
      (lead) => lead.leads.length && lead.leads[0].status == "Oportunidade",
    ).length;
    const totalLeadsAbordagem = leadsPeriodUpdate.filter(
      (lead) => lead.leads.length && lead.leads[0].status == "Abordagem",
    ).length;
    const totalLeadsAtendimento = leadsPeriodUpdate.filter(
      (lead) => lead.leads.length && lead.leads[0].status == "Atendimento",
    ).length;
    const totalLeadsQualificacao = leadsPeriodUpdate.filter(
      (lead) => lead.leads.length && lead.leads[0].status == "Qualificação",
    ).length;
    const totalLeadsPropostaEnviada = leadsPeriodUpdate.filter(
      (lead) => lead.leads.length && lead.leads[0].status == "Proposta Enviada",
    );
    const totalLeadsNegociacao = leadsPeriodUpdate.filter(
      (lead) => lead.leads.length && lead.leads[0].status == "Negociação",
    );
    const totalLeadsClientePerdido = leadsPeriodUpdate.filter(
      (lead) => lead.leads.length && lead.leads[0].status == "Cliente Perdido",
    ).length;

    const totalLeadsClienteFechado = leadsPeriodUpdate.filter(
      (lead) => lead.leads.length && lead.leads[0].status == "Cliente Fechado",
    );

    const totalLeadsClienteFechadoValue =
      (totalLeadsClienteFechado.reduce((acc, lead) => {
        const valorPrimeiroLead = lead?.leads?.[0]?.value ?? 0;

        return acc + Number(valorPrimeiroLead);
      }, 0) /
        100) *
      associate.comission;

    const totalLeadsPotentialValue = [
      ...totalLeadsPropostaEnviada,
      ...totalLeadsNegociacao,
    ].reduce((acc, lead) => {
      const valorPrimeiroLead = lead?.leads?.[0]?.value ?? 0;

      return acc + Number(valorPrimeiroLead);
    }, 0);

    return {
      totalPaymentsValue,
      totalLeadsCreated,
      leadsPeriodCreated,
      totalLeadsPendente,
      totalLeadsOportunidade,
      totalLeadsAbordagem,
      totalLeadsAtendimento,
      totalLeadsQualificacao,
      totalLeadsClientePerdido,
      totalLeadsPropostaEnviada: totalLeadsPropostaEnviada.length,
      totalLeadsNegociacao: totalLeadsNegociacao.length,
      totalLeadsClienteFechado: totalLeadsClienteFechado.length,
      totalLeadsClienteFechadoValue,
      totalLeadsPotentialValue,
    };
  }
}

export { ResumeAssociateService };
