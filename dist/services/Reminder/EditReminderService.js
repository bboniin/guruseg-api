"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditReminderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditReminderService {
  async execute({
    description,
    date,
    expiration_date,
    userId,
    name,
    id
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
    if (!name || !date || reminderGet.type == "order" && !expiration_date) {
      throw new Error("Preencha nome e data do lembrete para salvar");
    }
    const reminder = await _prisma.default.reminder.update({
      where: {
        id: id
      },
      data: {
        name: name,
        date: date,
        expiration_date: expiration_date,
        description: description
      }
    });
    return reminder;
  }
}
exports.EditReminderService = EditReminderService;