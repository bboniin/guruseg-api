"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusOrderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _path = require("path");
var _fs = _interopRequireDefault(require("fs"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _resend = require("resend");
var _ConfirmOrderService = require("./ConfirmOrderService");
var _dateFns = require("date-fns");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class StatusOrderService {
  async execute({
    id,
    userId,
    status,
    message
  }) {
    const order = await _prisma.default.order.findFirst({
      where: {
        id: id
      },
      include: {
        user: true,
        collaborator: true
      }
    });
    if (order.status == "aberto") {
      throw new Error("Ordem de serviço ainda não foi iniciada");
    }
    const resend = new _resend.Resend(process.env.RESEND_KEY);
    if (status == "alteracao") {
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "changeOS.hbs");
      const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
      const templateParse = _handlebars.default.compile(templateFileContent);
      const templateHTML = templateParse({
        id: order.id,
        name: order.collaborator.name
      });
      await resend.emails.send({
        from: "Equipe Guruseg <noreply@gurusegead.com.br>",
        to: order.collaborator.email,
        subject: "[Guruseg] Atualização Ordem de Serviço",
        html: templateHTML
      });
    }
    if (status == "finalizado") {
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "finishedOS.hbs");
      const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
      const templateParse = _handlebars.default.compile(templateFileContent);
      const templateHTML = templateParse({
        id: order.id,
        name: order.user.name,
        type: "clientes"
      });
      await resend.emails.send({
        from: "Equipe Guruseg <noreply@gurusegead.com.br>",
        to: order.user.email,
        subject: "[Guruseg] Atualização Ordem de Serviço",
        html: templateHTML
      });
      const templateHTMLTecnico = templateParse({
        id: order.id,
        name: order.collaborator.name,
        type: "tecnicos"
      });
      await resend.emails.send({
        from: "Equipe Guruseg <noreply@gurusegead.com.br>",
        to: order.collaborator.email,
        subject: "[Guruseg] Atualização Ordem de Serviço",
        html: templateHTMLTecnico
      });
    }
    if (message) {
      await _prisma.default.oSMessages.create({
        data: {
          message: message,
          orderId: id,
          type: userId == order.user_id ? "cliente" : "tecnico"
        }
      });
    }
    if (status == "confirm") {
      const confirmOrderService = new _ConfirmOrderService.ConfirmOrderService();
      const orderD = await confirmOrderService.execute({
        userId: order.user_id,
        id: order?.id
      });
      return orderD;
    } else {
      let final_delivery_date = order.delivery_date;
      if ((0, _dateFns.isPast)(new Date((0, _dateFns.addBusinessDays)(order.delivery_date, -1)))) {
        final_delivery_date = (0, _dateFns.addBusinessDays)(new Date(), order.urgent ? 1 : 2);
      }
      const orderD = await _prisma.default.order.update({
        where: {
          id: id
        },
        data: {
          status: status,
          ...(status === "finalizado" && {
            is_finished: true
          }),
          update_at: new Date(),
          delivery_date: final_delivery_date
        },
        include: {
          items: true,
          messages: true
        }
      });
      orderD["totalServices"] = 0;
      orderD["totalValue"] = 0;
      orderD.items.map(item => {
        orderD["totalServices"] += item.amount;
        orderD["totalValue"] += item.value * item.amount;
      });
      return orderD;
    }
  }
}
exports.StatusOrderService = StatusOrderService;