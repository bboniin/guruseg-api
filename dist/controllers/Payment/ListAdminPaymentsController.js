"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminPaymentsController = void 0;
var _ListAdminPaymentsService = require("../../services/Payment/ListAdminPaymentsService");
class ListAdminPaymentsController {
  async handle(req, res) {
    const {
      page,
      startDate,
      endDate,
      method,
      user_id,
      status,
      type
    } = req.query;
    const listAdminPaymentsService = new _ListAdminPaymentsService.ListAdminPaymentsService();
    const payments = await listAdminPaymentsService.execute({
      type: type ? String(type) : "",
      status: status ? String(status) : "",
      method: method ? String(method) : "",
      user_id: user_id ? String(user_id) : "",
      startDate: startDate ? String(startDate) : "",
      endDate: endDate ? String(endDate) : "",
      page: Number(page) > 0 ? Number(page) : 0
    });
    return res.json(payments);
  }
}
exports.ListAdminPaymentsController = ListAdminPaymentsController;