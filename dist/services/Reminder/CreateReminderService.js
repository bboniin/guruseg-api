"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateReminderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateReminderService {
  async execute({
    name,
    description,
    date,
    type,
    order_id,
    expiration_date,
    lead_id,
    userId
  }) {
    if (!name || !date) {
      throw new Error("Preencha nome e data do lembrete para salvar");
    }
    if (type == "lead") {
      const lead = await _prisma.default.lead.findFirst({
        where: {
          id: lead_id,
          user_id: userId
        }
      });
      if (!lead) {
        throw new Error("Lead não encontrado");
      }
    }
    if (type == "order") {
      const order = await _prisma.default.order.findFirst({
        where: {
          id: order_id,
          user_id: userId
        }
      });
      if (!order) {
        throw new Error("OS não encontrada");
      }
    }
    const reminder = await _prisma.default.reminder.create({
      data: {
        name: name,
        date: date,
        description: description,
        lead_id: lead_id || null,
        type: type,
        user_id: userId,
        order_id: order_id || null,
        expiration_date: expiration_date || date,
        confirm: false
      }
    });
    return reminder;
  }
}
exports.CreateReminderService = CreateReminderService;