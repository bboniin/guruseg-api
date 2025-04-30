import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { ConfirmOrderService } from "../Order/ConfirmOrderService";

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

    if (!payment) {
      const path = resolve(__dirname, "..", "..", "views", "errorWebhook.hbs");

      const templateFileContent = fs.readFileSync(path).toString("utf-8");

      const templateParse = handlebars.compile(templateFileContent);

      const templateHTML = templateParse({
        name: "Guruseg",
        data: JSON.stringify(data),
      });

      await transport.sendMail({
        from: {
          name: "Equipe Guruseg",
          address: "leonardo@guruseg.com.br",
        },
        to: {
          name: "Guruseg",
          address: "boninho7834@gmail.com",
        },
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

        const confirmOrderService = new ConfirmOrderService();

        await confirmOrderService.execute({
          userId: order.user_id,
          id: order.id,
          message: "",
        });

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

        await transport.sendMail({
          from: {
            name: "Equipe Guruseg",
            address: "leonardo@guruseg.com.br",
          },
          to: {
            name: order.user.name,
            address: order.user.email,
          },
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

        await transport.sendMail({
          from: {
            name: "Equipe Guruseg",
            address: "leonardo@guruseg.com.br",
          },
          to: {
            name: order.user.name,
            address: order.user.email,
          },
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

        await transport.sendMail({
          from: {
            name: "Equipe Guruseg",
            address: "leonardo@guruseg.com.br",
          },
          to: {
            name: order.user.name,
            address: order.user.email,
          },
          subject: "[Guruseg] Pagamento Cancelado",
          html: templateHTML,
        });
      }
    }
    return data;
  }
}

export { ConfirmPaymentService };
