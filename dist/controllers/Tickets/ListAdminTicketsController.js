"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminTicketsController = void 0;
var _ListAdminTicketsService = require("../../services/Tickets/ListAdminTicketsService");
class ListAdminTicketsController {
  async handle(req, res) {
    const {
      page
    } = req.query;
    const listAdminTicketsService = new _ListAdminTicketsService.ListAdminTicketsService();
    const ticket = await listAdminTicketsService.execute({
      page: Number(page) > 0 ? Number(page) : 0
    });
    return res.json(ticket);
  }
}
exports.ListAdminTicketsController = ListAdminTicketsController;