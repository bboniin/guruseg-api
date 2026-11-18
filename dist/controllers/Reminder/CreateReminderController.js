"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateReminderController = void 0;
var _CreateReminderService = require("../../services/Reminder/CreateReminderService");
class CreateReminderController {
  async handle(req, res) {
    const {
      name,
      description,
      date,
      expiration_date,
      type,
      order_id,
      lead_id
    } = req.body;
    const userId = req.userId;
    const createReminderService = new _CreateReminderService.CreateReminderService();
    const reminder = await createReminderService.execute({
      name,
      description,
      date,
      lead_id,
      userId,
      expiration_date,
      type,
      order_id
    });
    return res.json(reminder);
  }
}
exports.CreateReminderController = CreateReminderController;