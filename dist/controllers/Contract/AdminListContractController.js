"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminListContractsController = void 0;
var _AdminListContractsService = require("../../services/Contract/AdminListContractsService");
class AdminListContractsController {
  async handle(req, res) {
    const {
      user_id,
      search,
      page
    } = req.params;
    const adminListContractsService = new _AdminListContractsService.AdminListContractsService();
    const orders = await adminListContractsService.execute({
      user_id,
      search: search ? String(search) : "",
      page: Number(page) || 0
    });
    return res.json(orders);
  }
}
exports.AdminListContractsController = AdminListContractsController;