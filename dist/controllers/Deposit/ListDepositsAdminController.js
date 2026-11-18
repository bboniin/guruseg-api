"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListDepositsAdminController = void 0;
var _ListDepositsAdminService = require("../../services/Deposit/ListDepositsAdminService");
class ListDepositsAdminController {
  async handle(req, res) {
    const {
      page,
      collaborator_id,
      startDate,
      endDate,
      status
    } = req.query;
    const listDepositsAdminService = new _ListDepositsAdminService.ListDepositsAdminService();
    const deposits = await listDepositsAdminService.execute({
      page: Number(page) || 0,
      collaborator_id: String(collaborator_id || ""),
      endDate: endDate ? String(endDate) : "",
      status: status ? String(status) : "",
      startDate: startDate ? String(startDate) : ""
    });
    return res.json(deposits);
  }
}
exports.ListDepositsAdminController = ListDepositsAdminController;