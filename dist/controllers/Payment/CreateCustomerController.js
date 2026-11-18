"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomerController = void 0;
var _CreateCustomerService = require("../../services/Payment/CreateCustomerService");
class CreateCustomerController {
  async handle(req, res) {
    const {
      cpf
    } = req.body;
    let userId = req.userId;
    const createCustomerService = new _CreateCustomerService.CreateCustomerService();
    const customer = await createCustomerService.execute({
      cpf,
      userId
    });
    return res.json(customer);
  }
}
exports.CreateCustomerController = CreateCustomerController;