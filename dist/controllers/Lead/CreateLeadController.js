"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLeadController = void 0;
var _CreateLeadService = require("../../services/Lead/CreateLeadService");
class CreateLeadController {
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
      value,
      associate_id
    } = req.body;
    let userId = req.userId;
    const createLeadService = new _CreateLeadService.CreateLeadService();
    const lead = await createLeadService.execute({
      userId,
      name,
      observation,
      email,
      location,
      cnpj,
      necessity,
      phone_number,
      employees,
      associate_id,
      value
    });
    return res.json(lead);
  }
}
exports.CreateLeadController = CreateLeadController;