"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetOrderService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetOrderService {
  async execute({
    userId,
    id
  }) {
    const user = await _prisma.default.user.findFirst({
      where: {
        id: userId
      },
      select: {
        name: true,
        photo: true
      }
    });
    const collaborator = await _prisma.default.collaborator.findFirst({
      where: {
        id: userId
      },
      select: {
        name: true,
        photo: true
      }
    });
    const order = await _prisma.default.order.findFirst({
      where: {
        id: id
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
        },
        user: true,
        collaborator: true
      }
    });

    if (!order) {
      throw new Error("Ordem de serviço não foi encontrada");
    }

    if (user) {
      if (userId != order.user.id) {
        throw new Error("Essa ordem de serviço não está vinculada a sua conta");
      }
    } else {
      if (collaborator) {
        if (order.collaborator) {
          if (userId != order.collaborator.id) {
            throw new Error("Essa ordem de serviço não está vinculada a sua conta");
          }
        }
      }
    }

    return order;
  }

}

exports.GetOrderService = GetOrderService;