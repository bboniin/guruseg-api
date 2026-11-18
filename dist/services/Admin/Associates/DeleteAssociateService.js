"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAssociateService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteAssociateService {
  async execute({
    id
  }) {
    const associate = await _prisma.default.associate.update({
      where: {
        id: id
      },
      data: {
        visible: false,
        email: id
      }
    });
    return associate;
  }
}
exports.DeleteAssociateService = DeleteAssociateService;