"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditRenewalService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditRenewalService {
  async execute({
    id,
    fantasia,
    region,
    observation,
    date_renewal,
    date_init,
    type,
    cnpj,
    cpf,
    phone_number,
    razao_social
  }) {
    if (!razao_social || !date_init || !type || !cpf && !cnpj || !region || !date_init) {
      throw new Error("Preencha todos os campos");
    }
    cnpj = cnpj.replace(/[^0-9]/g, '');
    cpf = cpf.replace(/[^0-9]/g, '');
    let company = await _prisma.default.companyRenewal.findFirst({
      where: type == "PF" ? {
        cpf: cpf
      } : {
        cnpj: cnpj
      }
    });
    if (company) {
      if (company.id != id) {
        throw new Error("CNPJ/CPF já está cadastrado");
      }
    }
    const renewalRes = await _prisma.default.companyRenewal.update({
      where: {
        id: id
      },
      data: {
        fantasia: fantasia,
        razao_social: razao_social,
        type: type,
        cnpj: cnpj,
        date_renewal: new Date(date_renewal),
        cpf: cpf,
        region: region,
        observation: observation,
        phone_number: phone_number
      }
    });
    return renewalRes;
  }
}
exports.EditRenewalService = EditRenewalService;