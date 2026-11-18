"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLeadMasterController = void 0;
var _CreateLeadMasterService = require("../../services/Lead/CreateLeadMasterService");
class CreateLeadMasterController {
  async handle(req, res) {
    const {
      name,
      observation,
      email,
      location,
      cnpj,
      necessity,
      phone_number,
      employees,
      price,
      value,
      associate_id
    } = req.body;
    const createLeadMasterService = new _CreateLeadMasterService.CreateLeadMasterService();
    const lead = await createLeadMasterService.execute({
      name,
      observation,
      email,
      location,
      cnpj,
      necessity,
      phone_number,
      employees,
      price,
      value,
      associate_id
    });
    return res.json(lead);
  }
}
exports.CreateLeadMasterController = CreateLeadMasterController;