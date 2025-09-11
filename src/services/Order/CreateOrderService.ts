import { format } from "date-fns";
import prismaClient from "../../prisma";

interface OrderRequest {
  observation: string;
  userId: string;
  name: string;
  company_id: string;
  urgent: boolean;
  sector: string;
  items: Array<[]>;
}

class CreateOrderService {
  async execute({
    observation,
    userId,
    name,
    items,
    sector,
    urgent,
    company_id,
  }: OrderRequest) {
    if (items.length == 0 || !userId || !sector) {
      throw new Error("Preencha todos os campos.");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
        type: "cliente",
      },
    });
    if (!user) {
      throw new Error("Franqueado não encontrado");
    }

    const order = await prismaClient.order.create({
      data: {
        observation: observation,
        user_id: userId,
        month: format(new Date(), "yyyy-MM"),
        name: name,
        company_id: company_id,
        sector: sector,
        urgent: urgent,
        asaas_integration: user.enable_payment,
        status: "pendente",
      },
      include: {
        user: true,
      },
    });

    if (company_id) {
      await prismaClient.company.update({
        where: {
          id: company_id,
        },
        data: {
          order_id: order.id,
        },
      });
    }

    order["items"] = await [];
    order["totalServices"] = 0;
    order["totalValue"] = 0;

    await Promise.all(
      await items.map(async (data) => {
        const itemOrder = await prismaClient.item.create({
          data: {
            amount: data["amount"],
            order_id: order.id,
            name: data["name"],
            value: data["value"],
            commission: data["commission"],
            description: data["description"],
          },
        });
        order["items"].push(itemOrder);
        order["totalServices"] += data["amount"];
        order["totalValue"] += data["value"] * data["amount"];
      })
    );

    if (urgent) {
      const itemOrder = await prismaClient.item.create({
        data: {
          amount: 1,
          order_id: order.id,
          name: "Taxa de Urgencia",
          value: 147,
          commission: 0,
          description: "OS finalizada em menos de 24hrs",
        },
      });
      order["items"].push(itemOrder);
      order["totalServices"] += 1;
      order["totalValue"] += 147;
    }

    return order;
  }
}

export { CreateOrderService };
