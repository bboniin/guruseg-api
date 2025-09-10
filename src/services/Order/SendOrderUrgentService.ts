import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import { Resend } from "resend";

interface OrderRequest {
  id: number;
  userId: string;
  collaborator_id: string;
}

class SendOrderUrgentService {
  async execute({ id, userId, collaborator_id }: OrderRequest) {
    const order = await prismaClient.order.findFirst({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      throw new Error("Ordem de serviço já excluida");
    }

    if (order.collaborator_id) {
      throw new Error("Ordem de serviço já foi enviada para outro técnico");
    }

    if (!collaborator_id) {
      throw new Error("Selecione um técnico para enviar a ordem de serviço");
    }

    const orderD = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        status: "andamento",
        update_at: new Date(),
        collaborator_id: collaborator_id,
      },
      include: {
        collaborator: true,
      },
    });

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

    const pathR = resolve(__dirname, "..", "..", "views", "receiveOS.hbs");

    const templateFileContentR = fs.readFileSync(pathR).toString("utf-8");

    const templateParseR = handlebars.compile(templateFileContentR);

    const templateHTMLR = templateParseR({
      id: orderD.id,
      name: orderD.collaborator.name,
    });

    await resend.emails.send({
      from: "Equipe Guruseg <noreply@gurusegead.com.br>",
      to: orderD.collaborator.email,
      subject: "[Guruseg] Atualização Ordem de Serviço",
      html: templateHTMLR,
    });

    return orderD;
  }
}

export { SendOrderUrgentService };
