"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAllRenewalsController = void 0;
var _EditAllRenewalsService = require("../../services/CompanyRenewal/EditAllRenewalsService");
class EditAllRenewalsController {
  async handle(req, res) {
    let {
      region,
      newRegion
    } = req.body;
    const editAllRenewalsService = new _EditAllRenewalsService.EditAllRenewalsService();
    const renewals = await editAllRenewalsService.execute({
      region,
      newRegion
    });
    return res.json(renewals);
  }
}
exports.EditAllRenewalsController = EditAllRenewalsController;