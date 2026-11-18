"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDepositService = void 0;
var _dateFns = require("date-fns");
var _api = require("../../config/api");
var _prisma = _interopRequireDefault(require("../../prisma"));
var _CreateCustomerService = require("../Payment/CreateCustomerService");
var _functions = require("../../config/functions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateDepositService {
  async execute({
    userId,
    value,
    package_id,
    cpf
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    if (!user.costumer_id) {
      if (cpf) {
        if (!(0, _functions.validateCpf)(cpf)) {
          throw new Error("CPF inválido");
        }
        const createCustomerService = new _CreateCustomerService.CreateCustomerService();
        const costumer_id = await createCustomerService.execute({
          userId,
          cpf
        });
        user.costumer_id = costumer_id;
      } else {
        throw new Error("Franqueado não cadastrou CPF para nota fiscal");
      }
    }
    const depositPackage = await _prisma.default.depositPackage.findUnique({
      where: {
        id: package_id || ""
      }
    });
    if (!depositPackage && !value) {
      throw new Error("Pacote não está mais disponivel para compra");
    }
    const valueDeposit = value || depositPackage.value;
    if (valueDeposit < 10) {
      throw new Error("Valor minimo para depósito é R$ 10,00");
    }
    let responseDeposit;
    await _api.api.post("/payments", {
      value: valueDeposit,
      billingType: "PIX",
      customer: user.costumer_id,
      dueDate: (0, _dateFns.format)((0, _dateFns.addDays)(new Date(), 7), "yyyy-MM-dd")
    }).then(async response => {
      const payment = await _prisma.default.payment.create({
        data: {
          asaas_id: response.data.id,
          value: valueDeposit,
          user_id: userId,
          status: "pendente",
          type: "DEPOSIT",
          method: "PIX"
        }
      });
      const depositRes = await _prisma.default.deposit.create({
        data: {
          value: valueDeposit,
          name: depositPackage?.name || "Depósito Personalizado",
          description: depositPackage?.description || "",
          status: "pendente",
          user_id: userId,
          type: depositPackage?.type || "services",
          bonus: depositPackage?.bonus || 0
        }
      });
      const paymentEdit = await _prisma.default.payment.update({
        where: {
          id: payment.id
        },
        data: {
          deposit_id: depositRes.id
        }
      });
      await _api.api.get(`/payments/${response.data.id}/pixQrCode`).then(async res => {
        paymentEdit["pix"] = res.data;
        paymentEdit["deposit"] = depositRes;
        responseDeposit = paymentEdit;
      }).catch(e => {
        throw new Error("Ocorreu um gerar QR Code Pix, recarregue a página");
      });
    }).catch(e => {
      console.log(e);
      throw new Error("Ocorreu um erro ao criar cobrança");
    });
    return responseDeposit;
  }
}
exports.CreateDepositService = CreateDepositService;