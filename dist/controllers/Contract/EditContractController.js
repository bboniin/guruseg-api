"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditContractController = void 0;
var _EditContractService = require("../../services/Contract/EditContractService");
class EditContractController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      services,
      risk,
      lifes,
      name,
      services_gestao,
      company,
      contact,
      consultant,
      phone_number,
      banking,
      discount,
      service_name,
      service_value,
      service_description,
      life_value,
      initial_value
    } = req.body;
    let userId = req.userId;
    const editContractService = new _EditContractService.EditContractService();
    const order = await editContractService.execute({
      userId,
      services,
      contract_id: id,
      risk,
      lifes,
      name,
      services_gestao,
      company,
      contact,
      consultant,
      phone_number,
      banking,
      discount,
      service_name,
      service_value,
      service_description,
      life_value,
      initial_value
    });
    return res.json(order);
  }
}
exports.EditContractController = EditContractController;