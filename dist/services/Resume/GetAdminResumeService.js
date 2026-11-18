"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAdminResumeService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetAdminResumeService {
  async execute({
    start_date,
    end_date
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
    const ordersCount = await _prisma.default.order.count({
      where: filterDate
    });
    responseData.push({
      value: ordersCount,
      type: "number",
      name: "OS abertas nesse periodo"
    });
    const usersTotal = await _prisma.default.user.count({
      where: {
        visible: true
      }
    });
    responseData.push({
      value: usersTotal,
      type: "number",
      name: "Total de franqueados"
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
        status: "pendente"
      }
    });
    const paymentsValue = payments.reduce((sum, payment) => sum + payment.value, 0);
    responseData.push({
      value: paymentsValue,
      type: "currency",
      name: "A receber de pagamentos"
    });
    const paymentsConfirm = await _prisma.default.payment.findMany({
      where: {
        ...filterDate,
        status: "confirmado"
      }
    });
    const paymentsConfirmValue = paymentsConfirm.reduce((sum, payment) => sum + payment.value, 0);
    responseData.push({
      value: paymentsConfirmValue,
      type: "currency",
      name: "Pagamentos confirmados"
    });
    const ordersOpenCount = await _prisma.default.order.count({
      where: {
        ...filterDate,
        status: {
          notIn: ["finalizado", "cancelado"]
        }
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
        status: "finalizado"
      }
    });
    responseData.push({
      value: ordersFinish,
      type: "number",
      name: "OS finalizadas nesse periodo"
    });
    const leadsCount = await _prisma.default.leadMaster.count({
      where: filterDate
    });
    responseData.push({
      value: leadsCount,
      type: "number",
      name: "Leads por periodo"
    });
    return responseData;
  }
}
exports.GetAdminResumeService = GetAdminResumeService;