"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLeadMatrizController = void 0;
var _CreateLeadMatrizService = require("../../services/LeadMatriz/CreateLeadMatrizService");
class CreateLeadMatrizController {
  async handle(req, res) {
    const {
      name,
      email,
      phone_number,
      observation,
      employees,
      cnpj,
      value,
      price,
      necessity,
      location,
      status,
      tag,
      user_id,
      contract_id
    } = req.body;
    const createLeadMatrizService = new _CreateLeadMatrizService.CreateLeadMatrizService();
    const lead = await createLeadMatrizService.execute({
      name,
      email,
      phone_number,
      observation,
      employees,
      cnpj,
      value: value ? Number(value) : 0,
      price: price ? Number(price) : 0,
      necessity,
      location,
      status,
      tag,
      user_id: user_id || req.userId,
      contract_id
    });
    return res.json(lead);
  }
}
exports.CreateLeadMatrizController = CreateLeadMatrizController;