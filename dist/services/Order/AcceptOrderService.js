"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptOrderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _path = require("path");
var _fs = _interopRequireDefault(require("fs"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _resend = require("resend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AcceptOrderService {
  async execute({
    id,
    userId,
    message
  }) {
    const order = await _prisma.default.order.findFirst({
      where: {
        id: id
      },
      include: {
        user: true
      }
    });
    if (!order) {
      throw new Error("Ordem de serviço já excluida.");
    }
    if (order.collaborator_id) {
      throw new Error("Ordem de serviço já foi aceita por outro técnico.");
    }
    const collaborator = await _prisma.default.collaborator.findFirst({
      where: {
        id: userId
      }
    });
    if (collaborator.user_id) {
      if (collaborator.user_id != order.user_id) {
        throw new Error("Você não pode aceitar OS de outro franqueado");
      }
    }
    const path = (0, _path.resolve)(__dirname, "..", "..", "views", "acceptOS.hbs");
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
    const templateParse = _handlebars.default.compile(templateFileContent);
    const templateHTML = templateParse({
      id: order.id,
      name: order.user.name
    });
    const resend = new _resend.Resend(process.env.RESEND_KEY);
    await resend.emails.send({
      from: "Equipe Guruseg <noreply@gurusegead.com.br>",
      to: order.user.email,
      subject: "[Guruseg] Atualização Ordem de Serviço",
      html: templateHTML
    });
    const orderD = await _prisma.default.order.update({
      where: {
        id: id
      },
      data: {
        status: "andamento",
        update_at: new Date(),
        collaborator_id: userId
      },
      include: {
        items: true,
        messages: true
      }
    });
    if (message) {
      await _prisma.default.oSMessages.create({
        data: {
          message: message,
          orderId: id,
          type: "tecnico"
        }
      });
    }
    orderD["totalServices"] = 0;
    orderD["totalValue"] = 0;
    orderD.items.map(item => {
      orderD["totalServices"] += item.amount;
      orderD["totalValue"] += item.value * item.amount;
    });
    return orderD;
  }
}
exports.AcceptOrderService = AcceptOrderService;