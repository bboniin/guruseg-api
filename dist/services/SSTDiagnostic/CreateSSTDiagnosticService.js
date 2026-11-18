"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSSTDiagnosticService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateSSTDiagnosticService {
  async execute({
    userId,
    company_name,
    employees_count,
    assessment_date,
    franchisee_name,
    franchisee_phone,
    franchisee_email,
    answers,
    stats
  }) {
    if (!userId) {
      throw new Error("Usuário é obrigatório");
    }
    if (!company_name) {
      throw new Error("Nome da empresa é obrigatório");
    }
    const userExists = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    const DIAGNOSTIC_COST = 4.97;
    if (userExists.balance < DIAGNOSTIC_COST) {
      throw new Error("Saldo insuficiente para solicitar o Diagnóstico SST (Custo: R$ 4,97). Efetue um depósito para continuar.");
    }
    const answersString = typeof answers === "object" ? JSON.stringify(answers) : answers || "";
    const statsString = typeof stats === "object" ? JSON.stringify(stats) : stats || "";
    const diagnostic = await _prisma.default.sSTDiagnostic.create({
      data: {
        user_id: userId,
        company_name,
        employees_count: employees_count ? String(employees_count) : "",
        assessment_date: assessment_date || "",
        franchisee_name: franchisee_name || userExists.name || "",
        franchisee_phone: franchisee_phone || userExists.phone_number || "",
        franchisee_email: franchisee_email || userExists.email || "",
        answers: answersString,
        stats: statsString
      }
    });
    const newBalance = parseFloat((userExists.balance - DIAGNOSTIC_COST).toFixed(2));
    await _prisma.default.user.update({
      where: {
        id: userId
      },
      data: {
        balance: newBalance
      }
    });
    const payment = await _prisma.default.payment.create({
      data: {
        value: DIAGNOSTIC_COST,
        status: "confirmado",
        method: "SALDO",
        type: "DIAGNOSTICO_SST",
        description: "DIAGNOSTICO SST",
        diagnostic_id: diagnostic.id,
        user_id: userId
      }
    });
    return {
      ...diagnostic,
      payment_id: payment.id,
      cost: DIAGNOSTIC_COST,
      new_balance: newBalance,
      answers: answers || (answersString ? JSON.parse(answersString) : {}),
      stats: stats || (statsString ? JSON.parse(statsString) : {})
    };
  }
}
exports.CreateSSTDiagnosticService = CreateSSTDiagnosticService;