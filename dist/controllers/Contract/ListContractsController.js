"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListContractsController = void 0;

var _ListContractsService = require("../../services/Contract/ListContractsService");

class ListContractsController {
  async handle(req, res) {
    let userId = req.userId;
    const listContractsService = new _ListContractsService.ListContractsService();
    const contracts = await listContractsService.execute({
      userId
    });
    return res.json(contracts);
  }

}

exports.ListContractsController = ListContractsController;