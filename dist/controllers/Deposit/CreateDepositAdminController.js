"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDepositAdminController = void 0;
var _CreateDepositAdminService = require("../../services/Deposit/CreateDepositAdminService");
class CreateDepositAdminController {
  async handle(req, res) {
    const {
      value,
      bonus,
      collaborator_id,
      operation,
      description,
      type
    } = req.body;
    const createDepositAdminService = new _CreateDepositAdminService.CreateDepositAdminService();
    const deposit = await createDepositAdminService.execute({
      value,
      collaborator_id,
      bonus,
      description,
      type,
      operation
    });
    return res.json(deposit);
  }
}
exports.CreateDepositAdminController = CreateDepositAdminController;