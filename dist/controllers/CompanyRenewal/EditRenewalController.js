"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditRenewalController = void 0;
var _EditRenewalService = require("../../services/CompanyRenewal/EditRenewalService");
class EditRenewalController {
  async handle(req, res) {
    const {
      id
    } = req.params;
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
    const editRenewalService = new _EditRenewalService.EditRenewalService();
    const renewal = await editRenewalService.execute({
      id,
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
exports.EditRenewalController = EditRenewalController;