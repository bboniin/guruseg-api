"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListTicketsController = void 0;
var _ListTicketsService = require("../../services/Tickets/ListTicketsService");
class ListTicketsController {
  async handle(req, res) {
    const {
      page
    } = req.query;
    const userId = req.userId;
    const listTicketsService = new _ListTicketsService.ListTicketsService();
    const ticket = await listTicketsService.execute({
      userId,
      page: Number(page) > 0 ? Number(page) : 0
    });
    return res.json(ticket);
  }
}
exports.ListTicketsController = ListTicketsController;