"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLeadMatrizController = void 0;
var _EditLeadMatrizService = require("../../services/LeadMatriz/EditLeadMatrizService");
class EditLeadMatrizController {
  async handle(req, res) {
    const {
      id
    } = req.params;
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
    const leadId = id || req.body.id;
    const editLeadMatrizService = new _EditLeadMatrizService.EditLeadMatrizService();
    const lead = await editLeadMatrizService.execute({
      id: leadId,
      name,
      email,
      phone_number,
      observation,
      employees,
      cnpj,
      value: value !== undefined ? Number(value) : undefined,
      price: price !== undefined ? Number(price) : undefined,
      necessity,
      location,
      status,
      tag,
      user_id,
      contract_id
    });
    return res.json(lead);
  }
}
exports.EditLeadMatrizController = EditLeadMatrizController;