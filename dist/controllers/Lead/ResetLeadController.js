"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetLeadController = void 0;
var _ResetLeadService = require("../../services/Lead/ResetLeadService");
class ResetLeadController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const resetLeadService = new _ResetLeadService.ResetLeadService();
    const lead = await resetLeadService.execute({
      id
    });
    return res.json(lead);
  }
}
exports.ResetLeadController = ResetLeadController;