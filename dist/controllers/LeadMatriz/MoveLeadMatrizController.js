"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveLeadMatrizController = void 0;
var _MoveLeadMatrizService = require("../../services/LeadMatriz/MoveLeadMatrizService");
class MoveLeadMatrizController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      status
    } = req.body;
    const moveLeadMatrizService = new _MoveLeadMatrizService.MoveLeadMatrizService();
    const lead = await moveLeadMatrizService.execute({
      id: id || req.body.id,
      status
    });
    return res.json(lead);
  }
}
exports.MoveLeadMatrizController = MoveLeadMatrizController;