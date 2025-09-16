import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import { Resend } from "resend";

interface OrderRequest {
  observation: string;
  userId: string;
  order_id: number;
}

class RecusedDocOrderService {
  async execute({ order_id, observation, userId }: OrderRequest) {
    if (!userId || !order_id) {
      throw new Error("Preencha todos os campos.");
    }
    const orderGet = await prismaClient.order.findUnique({
      where: {
        id: order_id,
      },
      include: {
        items: true,
        messages: true,
        user: true,
        collaborator: true,
      },
    });

    if (!orderGet) {
      throw new Error("Ordem de serviço não encontrada");
    }

    if (userId != orderGet.user_id) {
      throw new Error("Ordem de serviço não pertence a esse franqueado");
    }

    if (orderGet.order_linked_id) {
      throw new Error(
        "Já foi solicitado a alteração do documento após recusa Ordem de serviço"
      );
    }

    const order = await prismaClient.order.create({
      data: {
        observation: observation,
        user_id: userId,
        month: orderGet.month,
        name: orderGet.name,
        company_id: orderGet.company_id,
        order_doc_recused: true,
        sector: "OS após Reprovação de documentos",
        urgent: orderGet.urgent,
        order_linked_id: orderGet.id,
        collaborator_id: orderGet["collaborator"].id,
        status: "andamento",
      },
      include: {
        user: true,
        collaborator: true,
      },
    });

    await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        order_linked_id: order.id,
      },
    });

    order["items"] = [];
    orderGet.items.map(async (data) => {
      const itemOrder = await prismaClient.item.create({
        data: {
          amount: data["amount"],
          order_id: order.id,
          name: data["name"],
          value: 0,
          commission: 0,
          description: data["description"],
        },
      });
      order["items"].push(itemOrder);
    });

    const path = resolve(__dirname, "..", "..", "views", "recusedDocOS.hbs");

    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse({
      id: order.id,
      name: order["collaborator"].name,
    });

    const resend = new Resend(process.env.RESEND_KEY);

    await resend.emails.send({
      from: "Equipe Guruseg <noreply@gurusegead.com.br>",
      to: order["collaborator"].email,
      subject: "[Guruseg] Atualização Ordem de Serviço",
      html: templateHTML,
    });

    return order;
  }
}

export { RecusedDocOrderService };
