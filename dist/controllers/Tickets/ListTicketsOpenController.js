"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListTicketsOpenController = void 0;
var _ListTicketsOpenService = require("../../services/Tickets/ListTicketsOpenService");
class ListTicketsOpenController {
  async handle(req, res) {
    const userId = req.userId;
    const listTicketsOpenService = new _ListTicketsOpenService.ListTicketsOpenService();
    const ticket = await listTicketsOpenService.execute({
      userId
    });
    return res.json(ticket);
  }
}
exports.ListTicketsOpenController = ListTicketsOpenController;