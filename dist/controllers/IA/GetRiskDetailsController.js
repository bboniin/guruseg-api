"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetRiskDetailsController = void 0;
var _GetRiskDetailsService = require("../../services/IA/GetRiskDetailsService");
class GetRiskDetailsController {
  async handle(req, res) {
    const {
      name,
      sector,
      type
    } = req.query;
    const getRiskDetailsService = new _GetRiskDetailsService.GetRiskDetailsService();
    const resRisks = await getRiskDetailsService.execute({
      name: String(name || ""),
      sector: String(sector || ""),
      type: String(type || "")
    });
    return res.json(resRisks);
  }
}
exports.GetRiskDetailsController = GetRiskDetailsController;