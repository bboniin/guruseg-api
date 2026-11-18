"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmPaymentService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _path = require("path");
var _fs = _interopRequireDefault(require("fs"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _ConfirmOrderService = require("../Order/ConfirmOrderService");
var _resend = require("resend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ConfirmPaymentService {
  async execute({
    data
  }) {
    const payment = await _prisma.default.payment.findUnique({
      where: {
        asaas_id: data["payment"]["id"]
      },
      include: {
        orders: {
          include: {
            user: true
          }
        }
      }
    });
    const resend = new _resend.Resend(process.env.RESEND_KEY);
    if (!payment) {
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "errorWebhook.hbs");
      const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
      const templateParse = _handlebars.default.compile(templateFileContent);
      const templateHTML = templateParse({
        name: "Guruseg",
        data: JSON.stringify(data)
      });
      await resend.emails.send({
        from: "Equipe Guruseg <noreply@gurusegead.com.br>",
        to: "boninho7834@gmail.com",
        subject: "[Guruseg] Error Webhook",
        html: templateHTML
      });
      return;
    } else {
      const order = payment.orders[0];
      const user = await _prisma.default.user.findUnique({
        where: {
          id: payment.user_id
        }
      });
      if (data["event"] == "PAYMENT_RECEIVED") {
        const paymentPaid = await _prisma.default.payment.update({
          where: {
            asaas_id: data["payment"]["id"]
          },
          data: {
            status: "confirmado"
          }
        });
        if (payment.type == "OS") {
          await _prisma.default.order.update({
            where: {
              id: paymentPaid.order_id
            },
            data: {
              status_payment: "confirmado"
            }
          });
          if (!order.collaborator_id && !order.urgent) {
            const confirmOrderService = new _ConfirmOrderService.ConfirmOrderService();
            await confirmOrderService.execute({
              userId: order.user_id,
              id: order?.id
            });
          }
        } else {
          const depositGet = await _prisma.default.deposit.findUnique({
            where: {
              id: paymentPaid.deposit_id
            }
          });
          const deposit = await _prisma.default.deposit.update({
            where: {
              id: paymentPaid.deposit_id
            },
            data: {
              status: "confirmado"
            }
          });
          if (depositGet.status != "confirmado") {
            if (depositGet.type == "services") {
              await _prisma.default.user.update({
                where: {
                  id: user.id
                },
                data: {
                  balance: parseFloat((user.balance + deposit.value + deposit.bonus).toFixed(2))
                }
              });
            } else {
              await _prisma.default.user.update({
                where: {
                  id: user.id
                },
                data: {
                  balance_leads: parseFloat((user.balance_leads + deposit.value + deposit.bonus).toFixed(2))
                }
              });
            }
          }
        }
        const path = (0, _path.resolve)(__dirname, "..", "..", "views", "confirmedPayment.hbs");
        const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
        const templateParse = _handlebars.default.compile(templateFileContent);
        const templateHTML = templateParse({
          name: user.name,
          order_id: order?.id,
          type: payment.type
        });
        await resend.emails.send({
          from: "Equipe Guruseg <noreply@gurusegead.com.br>",
          to: user.email,
          subject: "[Guruseg] Pagamento Confirmado",
          html: templateHTML
        });
      }
      if (data["event"] == "PAYMENT_OVERDUE") {
        const paymentCanceled = await _prisma.default.payment.update({
          where: {
            asaas_id: data["payment"]["id"]
          },
          data: {
            status: "expirado"
          }
        });
        if (payment.type == "OS") {
          await _prisma.default.order.update({
            where: {
              id: paymentCanceled.order_id
            },
            data: {
              payment_id: null,
              status_payment: "expirado"
            }
          });
        } else {
          await _prisma.default.deposit.update({
            where: {
              id: paymentCanceled.deposit_id
            },
            data: {
              status: "expirado"
            }
          });
        }
        if (payment.type == "OS" && order || payment.type == "DEPOSIT") {
          const path = (0, _path.resolve)(__dirname, "..", "..", "views", "expiredPayment.hbs");
          const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
          const templateParse = _handlebars.default.compile(templateFileContent);
          const templateHTML = templateParse({
            name: user.name,
            order_id: order?.id,
            type: payment.type
          });
          await resend.emails.send({
            from: "Equipe Guruseg <noreply@gurusegead.com.br>",
            to: user.email,
            subject: "[Guruseg] Pagamento Expirado",
            html: templateHTML
          });
        }
      }
      if (data["event"] == "PAYMENT_DELETED") {
        const paymentCanceled = await _prisma.default.payment.update({
          where: {
            asaas_id: data["payment"]["id"]
          },
          data: {
            status: "cancelado"
          }
        });
        if (payment.type == "OS") {
          await _prisma.default.order.update({
            where: {
              id: paymentCanceled.order_id
            },
            data: {
              payment_id: null,
              status_payment: "cancelado"
            }
          });
        } else {
          await _prisma.default.deposit.update({
            where: {
              id: paymentCanceled.deposit_id
            },
            data: {
              status: "expirado"
            }
          });
        }
        if (payment.type == "OS" && order || payment.type == "DEPOSIT") {
          const path = (0, _path.resolve)(__dirname, "..", "..", "views", "canceledPayment.hbs");
          const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
          const templateParse = _handlebars.default.compile(templateFileContent);
          const templateHTML = templateParse({
            name: user.name,
            order_id: order?.id,
            type: payment.type
          });
          await resend.emails.send({
            from: "Equipe Guruseg <noreply@gurusegead.com.br>",
            to: user.email,
            subject: "[Guruseg] Pagamento Cancelado",
            html: templateHTML
          });
        }
      }
    }
    return data;
  }
}
exports.ConfirmPaymentService = ConfirmPaymentService;