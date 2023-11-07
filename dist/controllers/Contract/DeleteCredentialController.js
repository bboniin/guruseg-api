"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteContractController = void 0;

var _DeleteContractService = require("../../services/Contract/DeleteContractService");

class DeleteContractController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteContractService = new _DeleteContractService.DeleteContractService();
    const contract = await deleteContractService.execute({
      id
    });
    return res.json(contract);
  }

}

exports.DeleteContractController = DeleteContractController;