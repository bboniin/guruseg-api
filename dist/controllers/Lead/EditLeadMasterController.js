"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLeadMasterController = void 0;
var _EditLeadMasterService = require("../../services/Lead/EditLeadMasterService");
class EditLeadMasterController {
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
      value,
      price,
      associate_id
    } = req.body;
    const editLeadMasterService = new _EditLeadMasterService.EditLeadMasterService();
    const lead = await editLeadMasterService.execute({
      name,
      id,
      observation,
      email,
      location,
      cnpj,
      necessity,
      phone_number,
      employees,
      value,
      price,
      associate_id
    });
    return res.json(lead);
  }
}
exports.EditLeadMasterController = EditLeadMasterController;