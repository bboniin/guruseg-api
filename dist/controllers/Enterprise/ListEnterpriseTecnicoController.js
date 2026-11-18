"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEnterpriseTecnicoController = void 0;
var _ListEnterpriseTecnicoService = require("../../services/Enterprise/ListEnterpriseTecnicoService");
class ListEnterpriseTecnicoController {
  async handle(req, res) {
    const {
      user_id,
      search,
      type,
      page,
      all
    } = req.query;
    const userId = req.userId;
    const listEnterpriseTecnicoService = new _ListEnterpriseTecnicoService.ListEnterpriseTecnicoService();
    const enterprises = await listEnterpriseTecnicoService.execute({
      userId,
      user_id: user_id ? String(user_id) : undefined,
      search: search ? String(search) : undefined,
      type: type ? String(type) : undefined,
      page: page !== undefined ? Number(page) : undefined,
      all: all === "true" || all === "1"
    });
    return res.json(enterprises);
  }
}
exports.ListEnterpriseTecnicoController = ListEnterpriseTecnicoController;