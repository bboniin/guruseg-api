"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPaymentController = void 0;
var _GetPaymentService = require("../../services/Payment/GetPaymentService");
class GetPaymentController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const getPaymentService = new _GetPaymentService.GetPaymentService();
    const payment = await getPaymentService.execute({
      payment_id: id,
      userId
    });
    return res.json(payment);
  }
}
exports.GetPaymentController = GetPaymentController;