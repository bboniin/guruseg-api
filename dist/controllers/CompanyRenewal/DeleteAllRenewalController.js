"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAllRenewalController = void 0;
var _DeleteAllRenewalService = require("../../services/CompanyRenewal/DeleteAllRenewalService");
class DeleteAllRenewalController {
  async handle(req, res) {
    const deleteAllRenewalService = new _DeleteAllRenewalService.DeleteAllRenewalService();
    const renewal = await deleteAllRenewalService.execute();
    return res.json(renewal);
  }
}
exports.DeleteAllRenewalController = DeleteAllRenewalController;