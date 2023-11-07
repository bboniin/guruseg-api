"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListOrdersService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListOrdersService {
  async execute({
    userId,
    type,
    month
  }) {
    let data = {};

    if (type == "cliente") {
      data = {
        user_id: userId
      };
    } else {
      if (type == "tecnico") {
        data = {
          collaborator_id: userId
        };
      } else {
        throw new Error("Nenhum tipo de usuário foi enviado.");
      }
    }

    if (month && month != "undefined") {
      data["month"] = month;
      data["status"] = "finalizado";
    }

    const orders = await _prisma.default.order.findMany({
      where: data,
      orderBy: {
        update_at: "desc"
      },
      include: {
        items: {
          orderBy: {
            create_at: "asc"
          }
        },
        docs: {
          orderBy: {
            create_at: "asc"
          }
        }
      }
    });
    const status = {
      "aberto": 0,
      "andamento": 0,
      "pendente": 0,
      "validacao": 0,
      "alteracao": 0,
      "finalizado": 1,
      "cancelado": 1,
      "recusado": 1
    };
    let ordersStatus = orders.sort(function (a, b) {
      return status[a.status] < status[b.status] ? -1 : status[a.status] > status[b.status] ? 1 : 0;
    });
    return ordersStatus;
  }

}

exports.ListOrdersService = ListOrdersService;