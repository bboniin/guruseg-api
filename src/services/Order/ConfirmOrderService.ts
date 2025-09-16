import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import { addDays } from "date-fns";
import { Resend } from "resend";

interface OrderRequest {
  id: number;
  userId: string;
}

class ConfirmOrderService {
  async execute({ userId, id }: OrderRequest) {
    if (!id || !userId) {
      throw new Error("Preencha todos os campos.");
    }

    const orderGet = await prismaClient.order.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        items: true,
        messages: true,
        docs: true,
      },
    });

    if (orderGet.collaborator_id) {
      throw new Error("Ordem de serviço já tem um técnico vinculado");
    }

    if (!orderGet.docs.length) {
      throw new Error(
        "Envie pelo menos um documento para confirmar o envio da documentação"
      );
    }

    const tecnico = await prismaClient.collaborator.findFirst({
      where: {
        enabled: true,
        visible: true,
        OR: [
          {
            sector: "Todos",
          },
          {
            sector: orderGet.sector,
          },
        ],
        user_id: userId,
      },
    });

    let tecnicosTotal = {};

    let collaborator = {
      id: null,
    };

    if (!tecnico) {
      const tecnicos = await prismaClient.collaborator.findMany({
        where: {
          enabled: true,
          visible: true,
          user_id: "",
          OR: [
            {
              sector: orderGet.sector,
            },
            {
              sector: "Todos",
            },
          ],
        },
      });

      const sectores = {
        "Serviços de segurança do Trabalho": orderGet.user.sector1_id,
        "Revenda de treinamentos online": orderGet.user.sector2_id,
        "Serviços Medicina ocupacional": orderGet.user.sector3_id,
        "Credenciamento SST": orderGet.user.sector4_id,
        "Assinatura Documentos SST": orderGet.user.sector5_id,
      };

      if (sectores[orderGet.sector]) {
        collaborator.id = sectores[orderGet.sector];
      } else {
        tecnicos.map((item) => {
          tecnicosTotal[item.id] = {
            oss: 0,
            total: 0,
          };
        });

        if (tecnicos.length != 0) {
          let total = 0;
          orderGet.items.map((item) => {
            total += item.amount * item.value;
          });
          if (total > 100) {
            const oss = await prismaClient.order.findMany({
              where: {
                create_at: {
                  gte: addDays(new Date(), -7),
                },
              },
              include: {
                items: true,
                messages: true,
              },
              orderBy: {
                create_at: "asc",
              },
            });

            oss.map((item) => {
              let total = 0;
              item.items.map((item) => {
                total += item.amount * item.value;
              });
              if (tecnicosTotal[item.collaborator_id]) {
                tecnicosTotal[item.collaborator_id].total += total;
              }
            });
            tecnicos.map((item) => {
              item["orders"] = tecnicosTotal[item.id].total;
            });

            collaborator = tecnicos.reduce((a, b) => {
              if (b["orders"] < a["orders"]) a = b;
              return a;
            });
          } else {
            const orders = await prismaClient.order.findMany({
              take: tecnicos.length - 1,
              where: {
                AND: [
                  {
                    collaborator_id: {
                      not: null,
                    },
                  },
                  {
                    status: {
                      not: "cancelado",
                    },
                  },
                  {
                    status: {
                      not: "recusado",
                    },
                  },
                  {
                    status: {
                      not: "aberto",
                    },
                  },
                ],
                id: {
                  not: orderGet.id,
                },
                sector: orderGet.sector,
              },
              orderBy: {
                create_at: "desc",
              },
            });

            orders.map((item) => {
              if (
                item.collaborator_id &&
                tecnicosTotal[item.collaborator_id] != undefined
              ) {
                tecnicosTotal[item.collaborator_id].oss++;
              }
            });

            tecnicos.map((item) => {
              item["orders"] = tecnicosTotal[item.id].oss;
            });

            collaborator = tecnicos.reduce((a, b) => {
              if (b["orders"] < a["orders"]) a = b;
              return a;
            });
          }
        }
      }
    } else {
      collaborator = tecnico;
    }

    const order = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        status: orderGet.urgent
          ? "aberto"
          : collaborator.id
            ? "andamento"
            : "aberto",
        collaborator_id: orderGet.urgent ? null : collaborator.id,
      },
      include: {
        items: true,
        messages: true,
        collaborator: true,
      },
    });

    order["totalServices"] = 0;
    order["totalValue"] = 0;

    order.items.map((item) => {
      order["totalServices"] += item.amount;
      order["totalValue"] += item.value * item.amount;
    });

    if (!orderGet.urgent && collaborator.id) {
      const path = resolve(__dirname, "..", "..", "views", "receivedOS.hbs");

      const templateFileContent = fs.readFileSync(path).toString("utf-8");

      const templateParse = handlebars.compile(templateFileContent);

      const templateHTML = templateParse({
        id: order.id,
        name: order.collaborator.name,
      });

      const resend = new Resend(process.env.RESEND_KEY);

      await resend.emails.send({
        from: "Equipe Guruseg <noreply@gurusegead.com.br>",
        to: order.collaborator.email,
        subject: "[Guruseg] Recebimento de OS",
        html: templateHTML,
      });
    }

    return order;
  }
}

export { ConfirmOrderService };
