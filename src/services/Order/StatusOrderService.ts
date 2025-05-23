import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface OrderRequest {
  id: number;
  userId: string;
  status: string;
  message: string;
}

class StatusOrderService {
  async execute({ id, userId, status, message }: OrderRequest) {
    const order = await prismaClient.order.findFirst({
      where: {
        id: id,
      },
      include: {
        user: true,
        collaborator: true,
      },
    });

    if (order.status == "aberto") {
      throw new Error("Ordem de serviço ainda não foi iniciada");
    }

    var transport = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "leonardo@guruseg.com.br",
        pass: "suimoooumyjdbqct",
      },
    });

    if (status == "alteracao") {
      const path = resolve(__dirname, "..", "..", "views", "changeOS.hbs");

      const templateFileContent = fs.readFileSync(path).toString("utf-8");

      const templateParse = handlebars.compile(templateFileContent);

      const templateHTML = templateParse({
        id: order.id,
        name: order.collaborator.name,
      });

      await transport.sendMail({
        from: {
          name: "Equipe Guruseg",
          address: "leonardo@guruseg.com.br",
        },
        to: {
          name: order.collaborator.name,
          address: order.collaborator.email,
        },
        subject: "[Guruseg] Atualização Ordem de Serviço",
        html: templateHTML,
      });
    }

    if (status == "finalizado") {
      const path = resolve(__dirname, "..", "..", "views", "finishedOS.hbs");

      const templateFileContent = fs.readFileSync(path).toString("utf-8");

      const templateParse = handlebars.compile(templateFileContent);

      const templateHTML = templateParse({
        id: order.id,
        name: order.user.name,
      });

      await transport.sendMail({
        from: {
          name: "Equipe Guruseg",
          address: "leonardo@guruseg.com.br",
        },
        to: [
          {
            name: order.user.name,
            address: order.user.email,
          },
          {
            name: order.collaborator.name,
            address: order.collaborator.email,
          },
        ],
        subject: "[Guruseg] Atualização Ordem de Serviço",
        html: templateHTML,
      });
    }

    if (message) {
      await prismaClient.oSMessages.create({
        data: {
          message: message,
          orderId: id,
          type: userId == order.user_id ? "franqueado" : "tecnico",
        },
      });
    }

    const orderD = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        update_at: new Date(),
      },
      include: {
        items: true,
        messages: true,
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

export { StatusOrderService };
