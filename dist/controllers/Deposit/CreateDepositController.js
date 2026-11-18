"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDepositController = void 0;
var _CreateDepositService = require("../../services/Deposit/CreateDepositService");
class CreateDepositController {
  async handle(req, res) {
    const {
      package_id,
      value,
      cpf
    } = req.body;
    let userId = req.userId;
    const createDepositService = new _CreateDepositService.CreateDepositService();
    const deposit = await createDepositService.execute({
      package_id,
      userId,
      value,
      cpf
    });
    return res.json(deposit);
  }
}
exports.CreateDepositController = CreateDepositController;