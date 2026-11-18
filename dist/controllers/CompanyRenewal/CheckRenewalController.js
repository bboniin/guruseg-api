"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckRenewalController = void 0;
var _CheckRenewalService = require("../../services/CompanyRenewal/CheckRenewalService");
class CheckRenewalController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      date_renewal,
      observation
    } = req.body;
    const checkRenewalService = new _CheckRenewalService.CheckRenewalService();
    const renewal = await checkRenewalService.execute({
      id,
      date_renewal,
      observation
    });
    return res.json(renewal);
  }
}
exports.CheckRenewalController = CheckRenewalController;