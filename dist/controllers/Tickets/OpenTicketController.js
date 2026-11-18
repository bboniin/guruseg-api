"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenTicketController = void 0;
var _OpenTicketService = require("../../services/Tickets/OpenTicketService");
class OpenTicketController {
  async handle(req, res) {
    const {
      content,
      send_type,
      order_id
    } = req.body;
    const userId = req.userId;
    const openTicketService = new _OpenTicketService.OpenTicketService();
    const ticket = await openTicketService.execute({
      userId,
      content,
      send_type,
      order_id
    });
    return res.json(ticket);
  }
}
exports.OpenTicketController = OpenTicketController;