"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetOrderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
        payment: true,
        user: true,
        collaborator: true,
        messages: {
          orderBy: {
            create_at: "desc"
          }
        },
        redemptions: true,
        enterprise: true
      }
    });
    if (order.redemptions[0]) {
      order["redemption"] = order.redemptions[0];
    }
    delete order.redemptions;
    if (!order) {
      throw new Error("Ordem de serviço não foi encontrada");
    }
    order["totalServices"] = 0;
    order["totalValue"] = 0;
    order.items.map(item => {
      order["totalServices"] += item.amount;
      order["totalValue"] += item.value * item.amount;
    });
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
    const s3Storage = new _S3Storage.default();
    if (order.user?.photo) {
      order.user["photo_url"] = await s3Storage.getTemporaryUrl(order.user.photo, 245);
    }
    if (order.collaborator?.photo) {
      order.collaborator["photo_url"] = await s3Storage.getTemporaryUrl(order.collaborator.photo, 245);
    }
    const docsResponse = await Promise.all(order.docs.map(async file => {
      file["file_url"] = await s3Storage.getTemporaryUrl(file.file, 245);
      file["fileName"] = String(file.file).substr(33);
      return file;
    }));
    return {
      ...order,
      docs: docsResponse
    };
  }
}
exports.GetOrderService = GetOrderService;