"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAttendantTicketsController = void 0;
var _ListAttendantTicketsService = require("../../services/Tickets/ListAttendantTicketsService");
class ListAttendantTicketsController {
  async handle(req, res) {
    const {
      page
    } = req.query;
    const userId = req.userId;
    const listAttendantTicketsService = new _ListAttendantTicketsService.ListAttendantTicketsService();
    const ticket = await listAttendantTicketsService.execute({
      page: Number(page) > 0 ? Number(page) : 0,
      userId
    });
    return res.json(ticket);
  }
}
exports.ListAttendantTicketsController = ListAttendantTicketsController;