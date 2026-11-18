"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteReminderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteReminderService {
  async execute({
    id,
    userId
  }) {
    const reminder = await _prisma.default.reminder.findFirst({
      where: {
        id: id,
        user_id: userId
      }
    });
    if (!reminder) {
      throw new Error("Lembrete não encontrado");
    }
    await _prisma.default.reminder.delete({
      where: {
        id: id
      }
    });
    return "Deletado com sucesso";
  }
}
exports.DeleteReminderService = DeleteReminderService;