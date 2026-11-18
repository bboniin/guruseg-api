"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLeadMatrizService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateLeadMatrizService {
  async execute({
    name,
    email,
    phone_number,
    observation,
    employees,
    cnpj,
    value,
    price,
    necessity,
    location,
    status,
    tag,
    user_id,
    contract_id
  }) {
    if (!name) {
      throw new Error("Nome do lead é obrigatório.");
    }
    const leadMatriz = await _prisma.default.leadMatriz.create({
      data: {
        name,
        email,
        phone_number,
        observation,
        employees,
        cnpj,
        value: value || 0,
        price: price || 0,
        necessity,
        location,
        status: status || "Oportunidade",
        tag: tag || "Cadastrado",
        user_id,
        contract_id
      }
    });
    return leadMatriz;
  }
}
exports.CreateLeadMatrizService = CreateLeadMatrizService;