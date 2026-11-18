"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusLeadController = void 0;
var _StatusLeadService = require("../../services/Lead/StatusLeadService");
class StatusLeadController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      label,
      status
    } = req.body;
    const statusLeadService = new _StatusLeadService.StatusLeadService();
    const lead = await statusLeadService.execute({
      id,
      label,
      status
    });
    return res.json(lead);
  }
}
exports.StatusLeadController = StatusLeadController;