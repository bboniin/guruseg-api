"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditReminderController = void 0;
var _EditReminderService = require("../../services/Reminder/EditReminderService");
class EditReminderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      description,
      date,
      expiration_date
    } = req.body;
    const editReminderService = new _EditReminderService.EditReminderService();
    const userId = req.userId;
    const reminder = await editReminderService.execute({
      name,
      description,
      date,
      id,
      expiration_date,
      userId
    });
    return res.json(reminder);
  }
}
exports.EditReminderController = EditReminderController;