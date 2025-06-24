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

        await prismaClient.order.update({
          where: {
            id: paymentPaid.order_id,
          },
          data: {
            status_payment: "confirmado",
          },
        });

        if (!order.collaborator_id) {
          const confirmOrderService = new ConfirmOrderService();

          await confirmOrderService.execute({
            userId: order.user_id,
            id: order.id,
            message: "",
          });
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
          name: order.user.name,
          order_id: order.id,
        });

        await resend.emails.send({
          from: "Equipe Guruseg <noreply@gurusegead.com.br>",
          to: order.user.email,
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

        await prismaClient.order.update({
          where: {
            id: paymentCanceled.order_id,
          },
          data: {
            payment_id: null,
            status_payment: "expirado",
          },
        });

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
          name: order.user.name,
          order_id: order.id,
        });

        await resend.emails.send({
          from: "Equipe Guruseg <noreply@gurusegead.com.br>",
          to: order.user.email,
          subject: "[Guruseg] Pagamento Expirado",
          html: templateHTML,
        });
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

        await prismaClient.order.update({
          where: {
            id: paymentCanceled.order_id,
          },
          data: {
            payment_id: null,
            status_payment: "cancelado",
          },
        });

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
          name: order.user.name,
          order_id: order.id,
        });

        await resend.emails.send({
          from: "Equipe Guruseg <noreply@gurusegead.com.br>",
          to: order.user.email,
          subject: "[Guruseg] Pagamento Cancelado",
          html: templateHTML,
        });
      }
    }
    return data;
  }
}

export { ConfirmPaymentService };
