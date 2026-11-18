"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecusedDocOrderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _path = require("path");
var _fs = _interopRequireDefault(require("fs"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _resend = require("resend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RecusedDocOrderService {
  async execute({
    order_id,
    observation,
    userId
  }) {
    if (!userId || !order_id) {
      throw new Error("Preencha todos os campos.");
    }
    const orderGet = await _prisma.default.order.findUnique({
      where: {
        id: order_id
      },
      include: {
        items: true,
        messages: true,
        user: true,
        collaborator: true,
        enterprise: true
      }
    });
    if (!orderGet) {
      throw new Error("Ordem de serviço não encontrada");
    }
    if (userId != orderGet.user_id) {
      throw new Error("Ordem de serviço não pertence a esse franqueado");
    }
    if (orderGet.order_linked_id) {
      throw new Error("Já foi solicitado a alteração do documento após recusa Ordem de serviço");
    }
    const order = await _prisma.default.order.create({
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
        status: "andamento"
      },
      include: {
        user: true,
        collaborator: true
      }
    });
    await _prisma.default.order.update({
      where: {
        id: order_id
      },
      data: {
        order_linked_id: order.id
      }
    });
    order["items"] = [];
    orderGet.items.map(async data => {
      const itemOrder = await _prisma.default.item.create({
        data: {
          amount: data["amount"],
          order_id: order.id,
          name: data["name"],
          value: 0,
          commission: 0,
          description: data["description"]
        }
      });
      order["items"].push(itemOrder);
    });
    const path = (0, _path.resolve)(__dirname, "..", "..", "views", "recusedDocOS.hbs");
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
    const templateParse = _handlebars.default.compile(templateFileContent);
    const templateHTML = templateParse({
      id: order.id,
      name: order["collaborator"].name
    });
    const resend = new _resend.Resend(process.env.RESEND_KEY);
    await resend.emails.send({
      from: "Equipe Guruseg <noreply@gurusegead.com.br>",
      to: order["collaborator"].email,
      subject: "[Guruseg] Atualização Ordem de Serviço",
      html: templateHTML
    });
    return order;
  }
}
exports.RecusedDocOrderService = RecusedDocOrderService;