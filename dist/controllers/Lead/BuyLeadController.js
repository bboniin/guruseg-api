"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuyLeadController = void 0;
var _BuyLeadService = require("../../services/Lead/BuyLeadService");
class BuyLeadController {
  async handle(req, res) {
    const userId = req.userId;
    const {
      id
    } = req.params;
    const buyLeadService = new _BuyLeadService.BuyLeadService();
    const lead = await buyLeadService.execute({
      userId,
      lead_id: id
    });
    return res.json(lead);
  }
}
exports.BuyLeadController = BuyLeadController;