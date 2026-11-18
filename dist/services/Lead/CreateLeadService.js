"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLeadService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateLeadService {
  async execute({
    name,
    userId,
    observation,
    email,
    location,
    cnpj,
    necessity,
    phone_number,
    employees,
    value,
    associate_id
  }) {
    if (!name) {
      throw new Error("Nome é obrigatório");
    }
    const user = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      userId = null;
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
    const leadMaster = await _prisma.default.leadMaster.create({
      data: {
        name: name,
        value: value || 0,
        email: email,
        phone_number: phone_number,
        observation: observation,
        employees: employees,
        necessity: necessity,
        cnpj: cnpj,
        is_user: !!userId,
        associate_id: associate_id,
        price: 0,
        tag: !!userId ? "Franqueado" : "Cadastrado",
        location: location
      }
    });
    const lead = await _prisma.default.lead.create({
      data: {
        name: name,
        value: value || 0,
        email: email,
        user_id: userId,
        tag: leadMaster.tag,
        phone_number: phone_number,
        observation: observation,
        employees: employees,
        necessity: necessity,
        price: 0,
        cnpj: cnpj,
        location: location,
        lead_id: leadMaster.id
      }
    });
    return lead;
  }
}
exports.CreateLeadService = CreateLeadService;