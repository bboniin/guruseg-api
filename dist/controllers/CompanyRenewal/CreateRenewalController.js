"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRenewalController = void 0;
var _CreateRenewalService = require("../../services/CompanyRenewal/CreateRenewalService");
class CreateRenewalController {
  async handle(req, res) {
    const {
      razao_social,
      observation,
      fantasia,
      type,
      cpf,
      cnpj,
      phone_number,
      whatsapp,
      region,
      date_init,
      date_renewal
    } = req.body;
    const createRenewalService = new _CreateRenewalService.CreateRenewalService();
    const renewal = await createRenewalService.execute({
      razao_social,
      observation,
      fantasia,
      type,
      cpf,
      cnpj,
      phone_number,
      whatsapp,
      region,
      date_init,
      date_renewal
    });
    return res.json(renewal);
  }
}
exports.CreateRenewalController = CreateRenewalController;