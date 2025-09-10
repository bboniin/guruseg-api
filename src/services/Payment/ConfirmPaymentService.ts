import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import { ConfirmOrderService } from "../Order/ConfirmOrderService";
import { Resend } from "resend";

interface OrderRequest {
  data: object;
}

class ConfirmPaymentService {
  async execute({ data }: OrderRequest) {
    const payment = await prismaClient.payment.findUnique({
      where: {
        asaas_id: data["payment"]["id"],
      },
      include: {
        orders: {
          include: {
            user: true,
          },
        },
      },
    });

    const user = await prismaClient.user.findUnique({
      where: {
        id: payment.user_id,
      },
    });

    const resend = new Resend(process.env.RESEND_KEY);

    if (!payment) {
      const path = resolve(__dirname, "..", "..", "views", "errorWebhook.hbs");

      const templateFileContent = fs.readFileSync(path).toString("utf-8");

      const templateParse = handlebars.compile(templateFileContent);

      const templateHTML = templateParse({
        name: "Guruseg",
        data: JSON.stringify(data),
      });

      await resend.emails.send({
        from: "Equipe Guruseg <noreply@gurusegead.com.br>",
        to: "boninho7834@gmail.com",
        subject: "[Guruseg] Error Webhook",
        html: templateHTML,
      });

      return;
    } else {
      const order = payment.orders[0];

      if (data["event"] == "PAYMENT_RECEIVED") {
        const paymentPaid = await prismaClient.payment.update({
          where: {
            asaas_id: data["payment"]["id"],
          },
          data: {
            status: "confirmado",
          },
        });

        if (payment.type == "OS") {
          await prismaClient.order.update({
            where: {
              id: paymentPaid.order_id,
            },
            data: {
              status_payment: "confirmado",
            },
          });

          if (!order.collaborator_id && !order.urgent) {
            const confirmOrderService = new ConfirmOrderService();

            await confirmOrderService.execute({
              userId: order.user_id,
              id: order?.id,
              message: "",
            });
          }
        } else {
          const depositGet = await prismaClient.deposit.findUnique({
            where: {
              id: paymentPaid.deposit_id,
            },
          });
          const deposit = await prismaClient.deposit.update({
            where: {
              id: paymentPaid.deposit_id,
            },
            data: {
              status: "confirmado",
            },
          });

          if (depositGet.status != "confirmado") {
            await prismaClient.user.update({
              where: {
                id: user.id,
              },
              data: {
                balance: user.balance + deposit.value + deposit.bonus,
              },
            });
          }
        }

        const path = resolve(
          __dirname,
          "..",
          "..",
          "views",
          "confirmedPayment.hbs"
        );

        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse({
          name: user.name,
          order_id: order?.id,
          type: payment.type,
        });

        await resend.emails.send({
          from: "Equipe Guruseg <noreply@gurusegead.com.br>",
          to: user.email,
          subject: "[Guruseg] Pagamento Confirmado",
          html: templateHTML,
        });
      }

      if (data["event"] == "PAYMENT_OVERDUE") {
        const paymentCanceled = await prismaClient.payment.update({
          where: {
            asaas_id: data["payment"]["id"],
          },
          data: {
            status: "expirado",
          },
        });

        if (payment.type == "OS") {
          await prismaClient.order.update({
            where: {
              id: paymentCanceled.order_id,
            },
            data: {
              payment_id: null,
              status_payment: "expirado",
            },
          });
        } else {
          await prismaClient.deposit.update({
            where: {
              id: paymentCanceled.deposit_id,
            },
            data: {
              status: "expirado",
            },
          });
        }

        if ((payment.type == "OS" && order) || payment.type == "DEPOSIT") {
          const path = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "expiredPayment.hbs"
          );

          const templateFileContent = fs.readFileSync(path).toString("utf-8");

          const templateParse = handlebars.compile(templateFileContent);

          const templateHTML = templateParse({
            name: user.name,
            order_id: order?.id,
            type: payment.type,
          });

          await resend.emails.send({
            from: "Equipe Guruseg <noreply@gurusegead.com.br>",
            to: user.email,
            subject: "[Guruseg] Pagamento Expirado",
            html: templateHTML,
          });
        }
      }

      if (data["event"] == "PAYMENT_DELETED") {
        const paymentCanceled = await prismaClient.payment.update({
          where: {
            asaas_id: data["payment"]["id"],
          },
          data: {
            status: "cancelado",
          },
        });

        if (payment.type == "OS") {
          await prismaClient.order.update({
            where: {
              id: paymentCanceled.order_id,
            },
            data: {
              payment_id: null,
              status_payment: "cancelado",
            },
          });
        } else {
          await prismaClient.deposit.update({
            where: {
              id: paymentCanceled.deposit_id,
            },
            data: {
              status: "expirado",
            },
          });
        }
        if ((payment.type == "OS" && order) || payment.type == "DEPOSIT") {
          const path = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "canceledPayment.hbs"
          );

          const templateFileContent = fs.readFileSync(path).toString("utf-8");

          const templateParse = handlebars.compile(templateFileContent);

          const templateHTML = templateParse({
            name: user.name,
            order_id: order?.id,
            type: payment.type,
          });

          await resend.emails.send({
            from: "Equipe Guruseg <noreply@gurusegead.com.br>",
            to: user.email,
            subject: "[Guruseg] Pagamento Cancelado",
            html: templateHTML,
          });
        }
      }
    }
    return data;
  }
}

export { ConfirmPaymentService };
