"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListPaymentsController = void 0;
var _ListPaymentsService = require("../../services/Payment/ListPaymentsService");
class ListPaymentsController {
  async handle(req, res) {
    let {
      page,
      order_id
    } = req.query;
    let userId = req.userId;
    const listPaymentsService = new _ListPaymentsService.ListPaymentsService();
    const payments = await listPaymentsService.execute({
      userId,
      order_id: Number(order_id) > 0 ? Number(order_id) : 0,
      page: Number(page) > 0 ? Number(page) : 0
    });
    return res.json(payments);
  }
}
exports.ListPaymentsController = ListPaymentsController;