"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRenewalsController = void 0;
var _ListRenewalsService = require("../../services/CompanyRenewal/ListRenewalsService");
class ListRenewalsController {
  async handle(req, res) {
    let {
      region
    } = req.query;
    const listRenewalsService = new _ListRenewalsService.ListRenewalsService();
    const renewals = await listRenewalsService.execute({
      region: region ? String(region) : ""
    });
    return res.json(renewals);
  }
}
exports.ListRenewalsController = ListRenewalsController;