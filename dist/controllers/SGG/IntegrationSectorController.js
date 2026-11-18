"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationSectorController = void 0;
var _IntegrationSectorService = require("../../services/SGG/IntegrationSectorService");
class IntegrationSectorController {
  async handle(req, res) {
    const {
      company_id
    } = req.body;
    const {
      id
    } = req.params;
    const userId = req.userId;
    const integrationSectorService = new _IntegrationSectorService.IntegrationSectorService();
    const sectorResponse = await integrationSectorService.execute({
      id: id,
      company_id,
      userId
    });
    return res.json(sectorResponse);
  }
}
exports.IntegrationSectorController = IntegrationSectorController;