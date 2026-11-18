"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListDepositsController = void 0;
var _ListDepositsService = require("../../services/Deposit/ListDepositsService");
class ListDepositsController {
  async handle(req, res) {
    const {
      page
    } = req.query;
    let userId = req.userId;
    const listDepositsService = new _ListDepositsService.ListDepositsService();
    const deposits = await listDepositsService.execute({
      userId,
      page: Number(page) || 0
    });
    return res.json(deposits);
  }
}
exports.ListDepositsController = ListDepositsController;