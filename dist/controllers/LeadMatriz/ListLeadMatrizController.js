"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLeadMatrizController = void 0;
var _ListLeadMatrizService = require("../../services/LeadMatriz/ListLeadMatrizService");
class ListLeadMatrizController {
  async handle(req, res) {
    const {
      user_id,
      search,
      status,
      page,
      all
    } = req.query;
    const listLeadMatrizService = new _ListLeadMatrizService.ListLeadMatrizService();
    const leads = await listLeadMatrizService.execute({
      user_id: user_id ? String(user_id) : undefined,
      search: search ? String(search) : undefined,
      status: status ? String(status) : undefined,
      page: page ? Number(page) || 0 : 0,
      all: all === "true"
    });
    return res.json(leads);
  }
}
exports.ListLeadMatrizController = ListLeadMatrizController;