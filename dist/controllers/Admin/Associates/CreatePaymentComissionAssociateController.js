"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePaymentComissionAssociateController = void 0;
var _CreatePaymentComissionAssociateService = require("../../../services/Admin/Associates/CreatePaymentComissionAssociateService");
class CreatePaymentComissionAssociateController {
  async handle(req, res) {
    const {
      description,
      value,
      associate_id
    } = req.body;
    const createPaymentComissionAssociateService = new _CreatePaymentComissionAssociateService.CreatePaymentComissionAssociateService();
    const payment = await createPaymentComissionAssociateService.execute({
      description,
      associate_id,
      value
    });
    return res.json(payment);
  }
}
exports.CreatePaymentComissionAssociateController = CreatePaymentComissionAssociateController;