"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SggCompanyController = void 0;
var _SggCompanyService = require("../../services/Company/SggCompanyService");
class SggCompanyController {
  async handle(req, res) {
    const {
      sgg_id
    } = req.body;
    const {
      company_id
    } = req.params;
    let userId = req.userId;
    const sggCompanyService = new _SggCompanyService.SggCompanyService();
    const company = await sggCompanyService.execute({
      company_id: company_id,
      sgg_id
    });
    return res.json(company);
  }
}
exports.SggCompanyController = SggCompanyController;