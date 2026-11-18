"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCollaboratorResumeService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetCollaboratorResumeService {
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
    const collaborator = await _prisma.default.collaborator.findUnique({
      where: {
        id: userId
      }
    });
    if (collaborator) {
      const ordersCount = await _prisma.default.order.count({
        where: {
          ...filterDate,
          collaborator_id: userId
        }
      });
      responseData.push({
        value: ordersCount,
        type: "number",
        name: "OS recebidas nesse periodo"
      });
      const ordersOpenCount = await _prisma.default.order.count({
        where: {
          ...filterDate,
          status: {
            notIn: ["finalizado", "cancelado"]
          },
          collaborator_id: userId
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
          collaborator_id: userId,
          status: "finalizado"
        }
      });
      responseData.push({
        value: ordersFinish,
        type: "number",
        name: "OS finalizadas nesse periodo"
      });
      return responseData;
    }
    throw new Error("Nenhum usuário encontrado");
  }
}
exports.GetCollaboratorResumeService = GetCollaboratorResumeService;