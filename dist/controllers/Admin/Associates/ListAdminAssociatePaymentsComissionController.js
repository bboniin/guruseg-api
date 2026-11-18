"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminAssociatePaymentsComissionController = void 0;
var _ListAdminAssociatePaymentsComissionService = require("../../../services/Admin/Associates/ListAdminAssociatePaymentsComissionService");
class ListAdminAssociatePaymentsComissionController {
  async handle(req, res) {
    const {
      page
    } = req.query;
    const {
      associate_id
    } = req.params;
    const listAdminAssociatePaymentsComissionService = new _ListAdminAssociatePaymentsComissionService.ListAdminAssociatePaymentsComissionService();
    const paymentsComission = await listAdminAssociatePaymentsComissionService.execute({
      associate_id,
      page: Number(page) || 0
    });
    return res.json(paymentsComission);
  }
}
exports.ListAdminAssociatePaymentsComissionController = ListAdminAssociatePaymentsComissionController;