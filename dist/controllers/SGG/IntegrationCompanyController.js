"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationCompanyController = void 0;
var _IntegrationCompanyService = require("../../services/SGG/IntegrationCompanyService");
class IntegrationCompanyController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const userId = req.userId;
    const integrationCompanyService = new _IntegrationCompanyService.IntegrationCompanyService();
    const company = await integrationCompanyService.execute({
      id,
      userId
    });
    return res.json(company);
  }
}
exports.IntegrationCompanyController = IntegrationCompanyController;