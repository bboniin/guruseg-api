"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateContractController = void 0;

var _CreateContractService = require("../../services/Contract/CreateContractService");

class CreateContractController {
  async handle(req, res) {
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
    const createContractService = new _CreateContractService.CreateContractService();
    const order = await createContractService.execute({
      userId,
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
    });
    return res.json(order);
  }

}

exports.CreateContractController = CreateContractController;