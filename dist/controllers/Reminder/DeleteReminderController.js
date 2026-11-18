"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteReminderController = void 0;
var _DeleteReminderService = require("../../services/Reminder/DeleteReminderService");
class DeleteReminderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteReminderService = new _DeleteReminderService.DeleteReminderService();
    const userId = req.userId;
    const reminder = await deleteReminderService.execute({
      id,
      userId
    });
    return res.json(reminder);
  }
}
exports.DeleteReminderController = DeleteReminderController;