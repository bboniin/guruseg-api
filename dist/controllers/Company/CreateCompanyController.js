"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCompanyController = void 0;

var _CreateCompanyService = require("../../services/Company/CreateCompanyService");

class CreateCompanyController {
  async handle(req, res) {
    const {
      razao_social,
      observation
    } = req.body;
    let userId = req.userId;
    const createCompanyService = new _CreateCompanyService.CreateCompanyService();
    const company = await createCompanyService.execute({
      razao_social,
      observation,
      userId
    });
    return res.json(company);
  }

}

exports.CreateCompanyController = CreateCompanyController;