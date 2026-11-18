"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomerService = void 0;
var _api = require("../../config/api");
var _functions = require("../../config/functions");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateCustomerService {
  async execute({
    cpf,
    userId
  }) {
    const user = await _prisma.default.user.findFirst({
      where: {
        id: userId,
        type: "cliente"
      }
    });
    if (!(0, _functions.validateCpf)(cpf)) {
      throw new Error("CPF inválido");
    }
    if (!user) {
      throw new Error("Franqueado não encontrado");
    }
    if (user.costumer_id) {
      throw new Error("Franqueado já cadastrou CPF");
    }
    let costumer_id = "";
    await _api.api.post("/customers", {
      name: user.name,
      cpfCnpj: cpf,
      mobilePhone: user.phone_number
    }).then(async response => {
      costumer_id = response.data.id;
      await _prisma.default.user.update({
        where: {
          id: user.id
        },
        data: {
          costumer_id: costumer_id
        }
      });
    }).catch(e => {
      throw new Error("Ocorreu um erro ao criar cobrança");
    });
    return costumer_id;
  }
}
exports.CreateCustomerService = CreateCustomerService;