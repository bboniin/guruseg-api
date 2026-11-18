"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptTicketController = void 0;
var _AcceptTicketService = require("../../services/Tickets/AcceptTicketService");
class AcceptTicketController {
  async handle(req, res) {
    const {
      ticket_id
    } = req.params;
    const userId = req.userId;
    const acceptTicketService = new _AcceptTicketService.AcceptTicketService();
    const ticket = await acceptTicketService.execute({
      userId,
      ticket_id
    });
    return res.json(ticket);
  }
}
exports.AcceptTicketController = AcceptTicketController;