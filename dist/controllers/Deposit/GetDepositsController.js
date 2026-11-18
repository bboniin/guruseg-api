"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetDepositsController = void 0;
var _GetDepositService = require("../../services/Deposit/GetDepositService");
class GetDepositsController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getDepositService = new _GetDepositService.GetDepositService();
    const deposits = await getDepositService.execute({
      id
    });
    return res.json(deposits);
  }
}
exports.GetDepositsController = GetDepositsController;