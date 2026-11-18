"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendLeadController = void 0;
var _SendLeadService = require("../../services/Lead/SendLeadService");
class SendLeadController {
  async handle(req, res) {
    const {
      userId,
      leads
    } = req.body;
    const sendLeadService = new _SendLeadService.SendLeadService();
    const lead = await sendLeadService.execute({
      userId,
      leads
    });
    return res.json(lead);
  }
}
exports.SendLeadController = SendLeadController;