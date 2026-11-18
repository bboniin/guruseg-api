"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetTicketController = void 0;
var _GetTicketService = require("../../services/Tickets/GetTicketService");
class GetTicketController {
  async handle(req, res) {
    const {
      ticket_id
    } = req.params;
    const userId = req.userId;
    const getTicketService = new _GetTicketService.GetTicketService();
    const ticket = await getTicketService.execute({
      userId,
      ticket_id
    });
    return res.json(ticket);
  }
}
exports.GetTicketController = GetTicketController;