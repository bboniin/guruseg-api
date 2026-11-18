"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendMessageTicketController = void 0;
var _SendMessageTicketService = require("../../services/Tickets/SendMessageTicketService");
class SendMessageTicketController {
  async handle(req, res) {
    const {
      ticket_id
    } = req.params;
    const {
      content,
      send_type
    } = req.body;
    const userId = req.userId;
    const sendMessageTicketService = new _SendMessageTicketService.SendMessageTicketService();
    const ticket = await sendMessageTicketService.execute({
      userId,
      content,
      send_type,
      ticket_id
    });
    return res.json(ticket);
  }
}
exports.SendMessageTicketController = SendMessageTicketController;