"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRenewalController = void 0;
var _DeleteRenewalService = require("../../services/CompanyRenewal/DeleteRenewalService");
class DeleteRenewalController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteRenewalService = new _DeleteRenewalService.DeleteRenewalService();
    const renewal = await deleteRenewalService.execute({
      id
    });
    return res.json(renewal);
  }
}
exports.DeleteRenewalController = DeleteRenewalController;