"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPaymentUserController = void 0;
var _GetPaymentUserService = require("../../services/Payment/GetPaymentUserService");
class GetPaymentUserController {
  async handle(req, res) {
    const getPaymentUserService = new _GetPaymentUserService.GetPaymentUserService();
    const payment = await getPaymentUserService.execute();
    return res.json(payment);
  }
}
exports.GetPaymentUserController = GetPaymentUserController;