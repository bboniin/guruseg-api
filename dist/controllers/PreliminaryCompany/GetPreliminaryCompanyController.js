"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPreliminaryCompanyController = void 0;
var _GetPreliminaryCompanyService = require("../../services/PreliminaryCompany/GetPreliminaryCompanyService");
class GetPreliminaryCompanyController {
  async handle(req, res) {
    const company_id = req.params.company_id || req.params.id;
    const getService = new _GetPreliminaryCompanyService.GetPreliminaryCompanyService();
    const result = await getService.execute({
      company_id
    });
    return res.json(result);
  }
}
exports.GetPreliminaryCompanyController = GetPreliminaryCompanyController;