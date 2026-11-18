"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTicketController = void 0;
var _CreateTicketService = require("../../services/Tickets/CreateTicketService");
class CreateTicketController {
  async handle(req, res) {
    const {
      content,
      ticket_id,
      send_id,
      send_type
    } = req.body;
    const userId = req.userId;
    const createTicketService = new _CreateTicketService.CreateTicketService();
    const ticket = await createTicketService.execute({
      userId,
      content,
      ticket_id,
      send_id,
      send_type
    });
    return res.json(ticket);
  }
}
exports.CreateTicketController = CreateTicketController;