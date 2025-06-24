import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import { Resend } from "resend";

interface OrderRequest {
  id: number;
  userId: string;
  message: string;
}

class RecusedOrderService {
  async execute({ id, userId, message }: OrderRequest) {
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

    if (order.collaborator_id) {
      throw new Error(
        "Ordem de serviço já foi aceita ou recusada por outro técnico."
      );
    }

    const path = resolve(__dirname, "..", "..", "views", "recusedOS.hbs");

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

    const orderD = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        status: "recusado",
        update_at: new Date(),
        collaborator_id: userId,
      },
      include: {
        items: true,
        messages: true,
      },
    });

    if (message) {
      await prismaClient.oSMessages.create({
        data: {
          message: message,
          orderId: id,
          type: "tecnico",
        },
      });
    }

    orderD["totalServices"] = 0;
    orderD["totalValue"] = 0;

    orderD.items.map((item) => {
      orderD["totalServices"] += item.amount;
      orderD["totalValue"] += item.value * item.amount;
    });

    return orderD;
  }
}

export { RecusedOrderService };
