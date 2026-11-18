"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetLeadController = void 0;
var _GetLeadService = require("../../services/Lead/GetLeadService");
class GetLeadController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getLeadService = new _GetLeadService.GetLeadService();
    const lead = await getLeadService.execute({
      id
    });
    return res.json(lead);
  }
}
exports.GetLeadController = GetLeadController;