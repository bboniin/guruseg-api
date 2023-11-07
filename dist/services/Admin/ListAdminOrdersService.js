"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminOrdersService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListAdminOrdersService {
  async execute({
    id,
    type,
    month
  }) {
    let data = {};

    if (type == "cliente") {
      data = {
        user_id: id
      };
    } else {
      if (type == "tecnico") {
        data = {
          collaborator_id: id
        };
      } else {
        throw new Error("Nenhum tipo de usuário foi enviado.");
      }
    }

    if (month && month != "undefined") {
      data["month"] = month;
    }

    const orders = await _prisma.default.order.findMany({
      where: data,
      orderBy: {
        create_at: "desc"
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
    return orders;
  }

}

exports.ListAdminOrdersService = ListAdminOrdersService;