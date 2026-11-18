"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckRenewalService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckRenewalService {
  async execute({
    id,
    observation,
    date_renewal
  }) {
    if (!date_renewal || !id) {
      throw new Error("Id e data de renovação é obrigatório");
    }
    if ((0, _dateFns.isAfter)(new Date(), date_renewal)) {
      throw new Error("Nova data de renovação está no passado");
    }
    const renewalRes = await _prisma.default.companyRenewal.update({
      where: {
        id: id
      },
      data: {
        date_renewal: new Date(date_renewal),
        observation: observation
      }
    });
    return renewalRes;
  }
}
exports.CheckRenewalService = CheckRenewalService;