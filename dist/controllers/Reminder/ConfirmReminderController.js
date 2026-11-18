"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmReminderController = void 0;
var _ConfirmReminderService = require("../../services/Reminder/ConfirmReminderService");
class ConfirmReminderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      repeat,
      date_repeat,
      description,
      date_expiration,
      name
    } = req.body;
    const userId = req.userId;
    const confirmReminderService = new _ConfirmReminderService.ConfirmReminderService();
    const reminder = await confirmReminderService.execute({
      repeat,
      date_repeat,
      date_expiration,
      id,
      description,
      name,
      userId
    });
    return res.json(reminder);
  }
}
exports.ConfirmReminderController = ConfirmReminderController;