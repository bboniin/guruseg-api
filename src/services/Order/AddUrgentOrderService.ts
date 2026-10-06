import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import { Resend } from "resend";
import { addDays } from "date-fns";

interface OrderRequest {
  id: number;
  userId: string;
}

class AddUrgentOrderService {
  async execute({ id, userId }: OrderRequest) {
    const order = await prismaClient.order.findFirst({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      throw new Error("Ordem de serviço já excluida.");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (147 > user.balance) {
      throw new Error("Saldo insuficiente para solicitar esse serviço");
    }

    const path = resolve(__dirname, "..", "..", "views", "acceptOS.hbs");

    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse({
      id: order.id,
      name: order.user.name,
    });

    const resend = new Resend(process.env.RESEND_KEY);

    await resend.emails.send({
      from: "Equipe Guruseg <noreply@gurusegead.com.br>",
      to: order.user.email,
      subject: "[Guruseg] Atualização Ordem de Serviço",
      html: templateHTML,
    });

    const paymentGet = await prismaClient.payment.findFirst({
      where: {
        order_id: order.id,
      },
    });

    if (!user) {
      throw new Error("Erro ao processar pagamento");
    }

    const payment = await prismaClient.payment.update({
      where: {
        id: paymentGet.id,
      },
      data: {
        value: paymentGet.value + 147,
      },
    });

    await prismaClient.order.update({
      where: {
        id: order.id,
      },
      data: {
        payment_id: payment.id,
      },
    });

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        balance: user.balance - 147,
      },
    });

    await prismaClient.item.create({
      data: {
        amount: 1,
        order_id: order.id,
        name: "Taxa de Urgência",
        value: 147,
        commission: 14.7,
        description: "OS finalizada de acordo com prazo selecionado",
      },
    });

    const orderD = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        update_at: new Date(),
        delivery_time: 1,
        delivery_date: addDays(new Date(), 1),
        urgent: true,
      },
      include: {
        items: true,
        messages: true,
        enterprise: true,
      },
    });

    orderD["totalServices"] = 0;
    orderD["totalValue"] = 0;

    orderD.items.map((item) => {
      orderD["totalServices"] += item.amount;
      orderD["totalValue"] += item.value * item.amount;
    });

    return orderD;
  }
}

export { AddUrgentOrderService };
