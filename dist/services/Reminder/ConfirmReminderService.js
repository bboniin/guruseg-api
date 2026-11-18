"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmReminderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ConfirmReminderService {
  async execute({
    repeat,
    date_repeat,
    date_expiration,
    id,
    description,
    name,
    userId
  }) {
    const reminderGet = await _prisma.default.reminder.findFirst({
      where: {
        id: id,
        user_id: userId
      }
    });
    if (!reminderGet) {
      throw new Error("Lembrete não encontrado");
    }
    if (repeat) {
      if (!name || !date_repeat || reminderGet.type == "order" && !date_expiration) {
        throw new Error("Preencha nome e data do novo lembrete para concluir");
      }
      await _prisma.default.reminder.create({
        data: {
          name: name,
          date: date_repeat,
          description: description,
          lead_id: reminderGet.lead_id,
          type: reminderGet.type,
          order_id: reminderGet.order_id,
          user_id: reminderGet.user_id,
          expiration_date: date_repeat,
          confirm: false
        }
      });
    }
    const reminder = await _prisma.default.reminder.update({
      where: {
        id: id
      },
      data: {
        confirm: true
      }
    });
    return reminder;
  }
}
exports.ConfirmReminderService = ConfirmReminderService;