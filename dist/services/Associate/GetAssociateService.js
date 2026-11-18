"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAssociateService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetAssociateService {
  async execute({
    userId
  }) {
    const associate = await _prisma.default.associate.findUnique({
      where: {
        id: userId
      }
    });
    const s3Storage = new _S3Storage.default();
    if (associate.photo) {
      associate["photo_url"] = await s3Storage.getTemporaryUrl(associate.photo, 245);
    }
    return associate;
  }
}
exports.GetAssociateService = GetAssociateService;