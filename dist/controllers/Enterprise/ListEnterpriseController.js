"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEnterpriseController = void 0;
var _ListEnterpriseService = require("../../services/Enterprise/ListEnterpriseService");
class ListEnterpriseController {
  async handle(req, res) {
    const userId = req.userId;
    const {
      search,
      type,
      page,
      all
    } = req.query;
    const listEnterpriseService = new _ListEnterpriseService.ListEnterpriseService();
    const enterprises = await listEnterpriseService.execute({
      userId,
      search: search ? String(search) : undefined,
      type: type ? String(type) : undefined,
      page: page !== undefined ? Number(page) : undefined,
      all: all === "true" || all === "1"
    });
    return res.json(enterprises);
  }
}
exports.ListEnterpriseController = ListEnterpriseController;