"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCollaboratorOrderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditCollaboratorOrderService {
  async execute({
    id,
    userId,
    collaborator_id
  }) {
    const order = await _prisma.default.order.findFirst({
      where: {
        id: id
      },
      include: {
        user: true
      }
    });
    if (!order) {
      throw new Error("Ordem de serviço não encontrada");
    }
    const orderD = await _prisma.default.order.update({
      where: {
        id: id
      },
      data: {
        collaborator_id: collaborator_id
      },
      include: {
        collaborator: true,
        enterprise: true
      }
    });
    const s3Storage = new _S3Storage.default();
    if (orderD.collaborator?.photo) {
      orderD.collaborator["photo_url"] = await s3Storage.getTemporaryUrl(orderD.collaborator.photo, 245);
    }
    return orderD;
  }
}
exports.EditCollaboratorOrderService = EditCollaboratorOrderService;