"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserResumeService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetUserResumeService {
  async execute({
    start_date,
    end_date,
    userId
  }) {
    let responseData = [];
    const filterDate = {
      AND: [{
        create_at: {
          gte: (0, _dateFns.startOfDay)(new Date(start_date))
        }
      }, {
        create_at: {
          lte: (0, _dateFns.endOfDay)(new Date(end_date))
        }
      }]
    };
    const user = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (user) {
      const ordersCount = await _prisma.default.order.count({
        where: {
          ...filterDate,
          user_id: userId
        }
      });
      responseData.push({
        value: ordersCount,
        type: "number",
        name: "OS solicitadas nesse periodo"
      });
      const ordersOpenCount = await _prisma.default.order.count({
        where: {
          ...filterDate,
          status: {
            notIn: ["finalizado", "cancelado"]
          },
          user_id: userId
        }
      });
      responseData.push({
        value: ordersOpenCount,
        type: "number",
        name: "OS em aberto"
      });
      const ordersFinish = await _prisma.default.order.count({
        where: {
          AND: [{
            update_at: {
              gte: (0, _dateFns.startOfDay)(new Date(start_date))
            }
          }, {
            update_at: {
              lte: (0, _dateFns.endOfDay)(new Date(end_date))
            }
          }],
          user_id: userId,
          status: "finalizado"
        }
      });
      responseData.push({
        value: ordersFinish,
        type: "number",
        name: "OS finalizadas nesse periodo"
      });
      const modulesTotal = await _prisma.default.module.count();
      responseData.push({
        value: modulesTotal,
        type: "number",
        name: "Módulos ativos"
      });
      const payments = await _prisma.default.payment.findMany({
        where: {
          ...filterDate,
          status: "pendente",
          user_id: userId
        }
      });
      const paymentsValue = payments.reduce((sum, payment) => sum + payment.value, 0);
      responseData.push({
        value: paymentsValue,
        type: "currency",
        name: "Pagamentos pendentes"
      });
      const paymentsConfirm = await _prisma.default.payment.findMany({
        where: {
          ...filterDate,
          status: "confirmado",
          user_id: userId
        }
      });
      const paymentsConfirmValue = paymentsConfirm.reduce((sum, payment) => sum + payment.value, 0);
      responseData.push({
        value: paymentsConfirmValue,
        type: "currency",
        name: "Pagamentos confirmados"
      });
      responseData.push({
        value: user.balance,
        type: "currency",
        name: "Saldo disponivel para serviços"
      });
      responseData.push({
        value: user.balance_leads,
        type: "currency",
        name: "Saldo disponivel para leads"
      });
      const leadsCount = await _prisma.default.lead.count({
        where: {
          ...filterDate,
          user_id: userId,
          price: 0
        }
      });
      responseData.push({
        value: leadsCount,
        type: "number",
        name: "Leads recebidos"
      });
      const leadsCountBuy = await _prisma.default.lead.count({
        where: {
          ...filterDate,
          user_id: userId,
          price: {
            gt: 0
          }
        }
      });
      responseData.push({
        value: leadsCountBuy,
        type: "number",
        name: "Leads comprados"
      });
      const leadsDisponible = await _prisma.default.leadMaster.count({
        where: {
          ...filterDate,
          leads: {
            none: {}
          },
          price: {
            gt: 0
          }
        }
      });
      responseData.push({
        value: leadsDisponible,
        type: "number",
        name: "Leads disponiveis"
      });
      const contractsSend = await _prisma.default.contract.count({
        where: {
          ...filterDate,
          user_id: userId
        }
      });
      responseData.push({
        value: contractsSend,
        type: "number",
        name: "Contratos enviados"
      });
      const formsSends = await _prisma.default.company.count({
        where: {
          ...filterDate,
          collaborador_id: userId
        }
      });
      responseData.push({
        value: formsSends,
        type: "number",
        name: "Formularios enviados"
      });
      return responseData;
    }
    throw new Error("Nenhum usuário encontrado");
  }
}
exports.GetUserResumeService = GetUserResumeService;