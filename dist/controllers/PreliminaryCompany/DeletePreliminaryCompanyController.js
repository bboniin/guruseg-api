"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeletePreliminaryCompanyController = void 0;
var _DeletePreliminaryCompanyService = require("../../services/PreliminaryCompany/DeletePreliminaryCompanyService");
class DeletePreliminaryCompanyController {
  async handle(req, res) {
    const company_id = req.params.company_id || req.params.id;
    const userId = req.userId;
    const deleteService = new _DeletePreliminaryCompanyService.DeletePreliminaryCompanyService();
    const result = await deleteService.execute({
      company_id,
      userId
    });
    return res.json(result);
  }
}
exports.DeletePreliminaryCompanyController = DeletePreliminaryCompanyController;