"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetRisksController = void 0;
var _GetRisksService = require("../../services/IA/GetRisksService");
class GetRisksController {
  async handle(req, res) {
    const {
      occupations,
      sector,
      description
    } = req.query;
    const getRisksService = new _GetRisksService.GetRisksService();
    const resRisks = await getRisksService.execute({
      occupations: String(occupations || ""),
      sector: String(sector || ""),
      description: String(description || "")
    });
    return res.json(resRisks);
  }
}
exports.GetRisksController = GetRisksController;