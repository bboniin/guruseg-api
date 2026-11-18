"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRenewalService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _dateFns = require("date-fns");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateRenewalService {
  async execute({
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
      throw new Error("CNPJ/CPF já está cadastrado");
    }
    if (!date_renewal) {
      date_renewal = new Date(date_init);
      while ((0, _dateFns.isAfter)(new Date(), new Date(date_renewal))) {
        date_renewal = (0, _dateFns.addYears)(new Date(date_renewal), 1);
      }
    }
    const renewalRes = await _prisma.default.companyRenewal.create({
      data: {
        fantasia: fantasia,
        razao_social: razao_social,
        type: type,
        cnpj: cnpj,
        date_renewal: date_renewal,
        cpf: cpf,
        region: region,
        observation: observation,
        date_init: new Date(date_init),
        phone_number: phone_number
      }
    });
    return renewalRes;
  }
}
exports.CreateRenewalService = CreateRenewalService;