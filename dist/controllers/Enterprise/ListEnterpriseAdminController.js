"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEnterpriseAdminController = void 0;
var _ListEnterpriseAdminService = require("../../services/Enterprise/ListEnterpriseAdminService");
class ListEnterpriseAdminController {
  async handle(req, res) {
    const {
      user_id,
      search,
      type,
      page,
      all
    } = req.query;
    const listEnterpriseAdminService = new _ListEnterpriseAdminService.ListEnterpriseAdminService();
    const enterprises = await listEnterpriseAdminService.execute({
      user_id: user_id ? String(user_id) : undefined,
      search: search ? String(search) : undefined,
      type: type ? String(type) : undefined,
      page: page !== undefined ? Number(page) : undefined,
      all: all === "true" || all === "1"
    });
    return res.json(enterprises);
  }
}
exports.ListEnterpriseAdminController = ListEnterpriseAdminController;