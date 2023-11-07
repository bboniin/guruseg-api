"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetContractController = void 0;

var _GetContractService = require("../../services/Contract/GetContractService");

class GetContractController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getContractService = new _GetContractService.GetContractService();
    const contract = await getContractService.execute({
      id
    });
    return res.json(contract);
  }

}

exports.GetContractController = GetContractController;