"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndNegotiationContractController = void 0;
var _EndNegotiationContractService = require("../../services/Contract/EndNegotiationContractService");
class EndNegotiationContractController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const endNegotiationContractService = new _EndNegotiationContractService.EndNegotiationContractService();
    const services = await endNegotiationContractService.execute({
      id,
      userId
    });
    return res.json(services);
  }
}
exports.EndNegotiationContractController = EndNegotiationContractController;