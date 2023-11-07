"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCompanyController = void 0;

var _GetCompanyService = require("../../services/Company/GetCompanyService");

class GetCompanyController {
  async handle(req, res) {
    const {
      company_id
    } = req.params;
    const getCompanyService = new _GetCompanyService.GetCompanyService();
    const company = await getCompanyService.execute({
      company_id
    });
    return res.json(company);
  }

}

exports.GetCompanyController = GetCompanyController;