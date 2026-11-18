"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCollaboratorService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetCollaboratorService {
  async execute({
    userId
  }) {
    const collaborator = await _prisma.default.collaborator.findUnique({
      where: {
        id: userId
      }
    });
    const s3Storage = new _S3Storage.default();
    if (collaborator.photo) {
      collaborator["photo_url"] = await s3Storage.getTemporaryUrl(collaborator.photo, 245);
    }
    return collaborator;
  }
}
exports.GetCollaboratorService = GetCollaboratorService;