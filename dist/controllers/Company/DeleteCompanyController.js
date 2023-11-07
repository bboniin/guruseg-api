"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCompanyController = void 0;

var _DeleteCompanyService = require("../../services/Company/DeleteCompanyService");

class DeleteCompanyController {
  async handle(req, res) {
    const {
      company_id
    } = req.params;
    let userId = req.userId;
    const deleteCompanyService = new _DeleteCompanyService.DeleteCompanyService();
    const image = await deleteCompanyService.execute({
      company_id,
      userId
    });
    return res.json(image);
  }

}

exports.DeleteCompanyController = DeleteCompanyController;