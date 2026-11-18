"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationRisksController = void 0;
var _IntegrationRisksService = require("../../services/SGG/IntegrationRisksService");
class IntegrationRisksController {
  async handle(req, res) {
    const {
      company_id
    } = req.body;
    const {
      id
    } = req.params;
    const userId = req.userId;
    const integrationRisksService = new _IntegrationRisksService.IntegrationRisksService();
    const riskResponse = await integrationRisksService.execute({
      id,
      company_id,
      userId
    });
    return res.json(riskResponse);
  }
}
exports.IntegrationRisksController = IntegrationRisksController;