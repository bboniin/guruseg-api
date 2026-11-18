"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPaymentService = void 0;
var _api = require("../../config/api");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetPaymentService {
  async execute({
    payment_id,
    userId
  }) {
    const admin = await _prisma.default.admin.findFirst({
      where: {
        id: userId
      }
    });
    const payment = await _prisma.default.payment.findUnique({
      where: {
        id: payment_id
      }
    });
    if (!payment) {
      throw new Error("Pagamento não encontrado");
    }
    if (!admin && payment?.user_id != userId) {
      throw new Error("Pagamento não encontrado");
    }
    let paymentResponse = payment;
    if (payment.asaas_id) {
      await _api.api.get(`/payments/${payment.asaas_id}/pixQrCode`).then(async res => {
        paymentResponse["pix"] = res.data;
      }).catch(e => {
        throw new Error("Ocorreu um gerar QR Code Pix, recarregue a página");
      });
    }
    return paymentResponse;
  }
}
exports.GetPaymentService = GetPaymentService;