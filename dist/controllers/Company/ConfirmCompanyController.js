"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmCompanyController = void 0;
var _ConfirmCompanyService = require("../../services/Company/ConfirmCompanyService");
class ConfirmCompanyController {
  async handle(req, res) {
    const {
      company_id
    } = req.params;
    const confirmCompanyService = new _ConfirmCompanyService.ConfirmCompanyService();
    const company = await confirmCompanyService.execute({
      company_id: company_id
    });
    return res.json(company);
  }
}
exports.ConfirmCompanyController = ConfirmCompanyController;