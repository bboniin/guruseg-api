"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationJobController = void 0;
var _IntegrationJobService = require("../../services/SGG/IntegrationJobService");
class IntegrationJobController {
  async handle(req, res) {
    const {
      company_id
    } = req.body;
    const {
      id
    } = req.params;
    const userId = req.userId;
    const integrationJobService = new _IntegrationJobService.IntegrationJobService();
    const jobResponse = await integrationJobService.execute({
      id,
      company_id,
      userId
    });
    return res.json(jobResponse);
  }
}
exports.IntegrationJobController = IntegrationJobController;