"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignatureContractController = void 0;

var _SignatureContractService = require("../../services/Contract/SignatureContractService");

class SignatureContractController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      signature
    } = req.body;
    const signatureContractService = new _SignatureContractService.SignatureContractService();
    const services = await signatureContractService.execute({
      signature,
      id
    });
    return res.json(services);
  }

}

exports.SignatureContractController = SignatureContractController;