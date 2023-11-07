"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListOpenOrdersService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListOpenOrdersService {
  async execute({
    userId
  }) {
    const collaborator = await _prisma.default.collaborator.findFirst({
      where: {
        id: userId
      }
    });
    let whereData = {};

    if (collaborator.sector == "Todos") {
      whereData = {
        status: "aberto"
      };
    } else {
      whereData = {
        sector: collaborator.sector,
        status: "aberto"
      };
    }

    const orders = await _prisma.default.order.findMany({
      where: whereData,
      orderBy: {
        urgent: "desc"
      },
      include: {
        items: {
          orderBy: {
            create_at: "asc"
          },
          select: {
            amount: true
          }
        }
      }
    });
    return orders;
  }

}

exports.ListOpenOrdersService = ListOpenOrdersService;