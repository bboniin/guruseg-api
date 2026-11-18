"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePaymentComissionAssociateService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreatePaymentComissionAssociateService {
  async execute({
    description,
    associate_id,
    value
  }) {
    if (!value) {
      throw new Error("Valor é obrigatório");
    }
    const associate = await _prisma.default.associate.findUnique({
      where: {
        id: associate_id
      }
    });
    if (!associate) {
      throw new Error("Associado não encontrado");
    }
    const payment = await _prisma.default.associatePayment.create({
      data: {
        description: description,
        value: value,
        associate_id: associate_id
      }
    });
    return payment;
  }
}
exports.CreatePaymentComissionAssociateService = CreatePaymentComissionAssociateService;