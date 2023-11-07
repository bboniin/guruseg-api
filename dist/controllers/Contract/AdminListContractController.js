"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminListContractsController = void 0;

var _AdminListContractsService = require("../../services/Contract/AdminListContractsService");

class AdminListContractsController {
  async handle(req, res) {
    const {
      user_id
    } = req.params;
    let userId = req.userId;
    const adminListContractsService = new _AdminListContractsService.AdminListContractsService();
    const orders = await adminListContractsService.execute({
      user_id,
      userId
    });
    return res.json(orders);
  }

}

exports.AdminListContractsController = AdminListContractsController;