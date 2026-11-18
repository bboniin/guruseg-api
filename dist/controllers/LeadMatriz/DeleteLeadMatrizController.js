"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteLeadMatrizController = void 0;
var _DeleteLeadMatrizService = require("../../services/LeadMatriz/DeleteLeadMatrizService");
class DeleteLeadMatrizController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteLeadMatrizService = new _DeleteLeadMatrizService.DeleteLeadMatrizService();
    const lead = await deleteLeadMatrizService.execute({
      id: id || req.body.id
    });
    return res.json(lead);
  }
}
exports.DeleteLeadMatrizController = DeleteLeadMatrizController;