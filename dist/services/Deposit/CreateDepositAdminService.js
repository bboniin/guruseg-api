"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDepositAdminService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateDepositAdminService {
  async execute({
    collaborator_id,
    bonus,
    description,
    value,
    operation,
    type
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: collaborator_id
      }
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    if (operation == "saida") {
      value *= -1;
      bonus *= -1;
    }
    const deposit = await _prisma.default.deposit.create({
      data: {
        value: value,
        name: operation == "saida" ? "Retirada de Saldo" : "Envio de Saldo",
        description: description,
        status: "confirmado",
        user_id: collaborator_id,
        bonus: bonus,
        type: type
      }
    });
    if (type == "services") {
      await _prisma.default.user.update({
        where: {
          id: collaborator_id
        },
        data: {
          balance: parseFloat((user.balance + value + bonus).toFixed(2))
        }
      });
    } else {
      await _prisma.default.user.update({
        where: {
          id: collaborator_id
        },
        data: {
          balance_leads: parseFloat((user.balance_leads + value + bonus).toFixed(2))
        }
      });
    }
    return deposit;
  }
}
exports.CreateDepositAdminService = CreateDepositAdminService;