"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CancelOrderService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CancelOrderService {
  async execute({
    id
  }) {
    const order = await _prisma.default.order.findFirst({
      where: {
        id: id
      }
    });

    if (order.collaborator_id) {
      throw new Error("Ordem de serviço já está em andamento, não sendo possivel mais a exclusão.");
    }

    const orderD = await _prisma.default.order.update({
      where: {
        id: id
      },
      data: {
        status: "cancelado"
      }
    });
    return orderD;
  }

}

exports.CancelOrderService = CancelOrderService;