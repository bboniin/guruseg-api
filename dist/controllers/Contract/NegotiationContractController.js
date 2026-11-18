"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NegotiationContractController = void 0;
var _NegotiationContractService = require("../../services/Contract/NegotiationContractService");
class NegotiationContractController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const negotiationContractService = new _NegotiationContractService.NegotiationContractService();
    const services = await negotiationContractService.execute({
      id
    });
    return res.json(services);
  }
}
exports.NegotiationContractController = NegotiationContractController;