"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetDepositService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetDepositService {
  async execute({
    id
  }) {
    const deposit = await _prisma.default.deposit.findUnique({
      where: {
        id: id
      },
      include: {
        user: true
      }
    });
    if (!deposit) {
      throw new Error("Deposito não encontrado");
    }
    return deposit;
  }
}
exports.GetDepositService = GetDepositService;