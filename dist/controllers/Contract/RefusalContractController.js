"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefusalContractController = void 0;

var _RefusalContractService = require("../../services/Contract/RefusalContractService");

class RefusalContractController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const refusalContractService = new _RefusalContractService.RefusalContractService();
    const services = await refusalContractService.execute({
      id
    });
    return res.json(services);
  }

}

exports.RefusalContractController = RefusalContractController;