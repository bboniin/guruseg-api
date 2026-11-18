"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLeadController = void 0;
var _EditLeadService = require("../../services/Lead/EditLeadService");
class EditLeadController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      observation,
      email,
      location,
      cnpj,
      necessity,
      phone_number,
      employees,
      value
    } = req.body;
    const editLeadService = new _EditLeadService.EditLeadService();
    const lead = await editLeadService.execute({
      name,
      id,
      observation,
      email,
      location,
      cnpj,
      necessity,
      phone_number,
      employees,
      value
    });
    return res.json(lead);
  }
}
exports.EditLeadController = EditLeadController;