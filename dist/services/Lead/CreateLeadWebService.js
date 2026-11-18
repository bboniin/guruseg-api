"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLeadWebService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateLeadWebService {
  async execute({
    name,
    observation,
    tag,
    email,
    location,
    cnpj,
    necessity,
    phone_number,
    employees,
    price
  }) {
    if (!name) {
      throw new Error("Nome é obrigatório");
    }
    if (email) {
      const leadMaster = await _prisma.default.leadMaster.findFirst({
        where: {
          email: email
        }
      });
      if (leadMaster) {
        throw new Error("Email já está em uso");
      }
    }
    const lead = await _prisma.default.leadMaster.create({
      data: {
        name: name,
        value: 0,
        email: email,
        phone_number: phone_number,
        observation: observation,
        employees: employees,
        necessity: necessity,
        cnpj: cnpj,
        price: price || 0,
        tag: tag,
        location: location
      }
    });
    return lead;
  }
}
exports.CreateLeadWebService = CreateLeadWebService;