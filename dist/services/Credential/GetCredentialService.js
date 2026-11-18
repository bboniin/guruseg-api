"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCredentialService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetCredentialService {
  async execute({
    id
  }) {
    const credential = await _prisma.default.credential.findUnique({
      where: {
        id: id
      },
      select: {
        email: true,
        name: true,
        phone_number: true,
        state: true,
        city: true,
        services: true,
        served_cities: true,
        profession: true,
        birthday: true,
        description: true,
        photo: true,
        enabled: true,
        visible: true,
        id: true
      }
    });
    if (!credential) {
      throw new Error("Credenciado não foi encontrado");
    }
    const s3Storage = new _S3Storage.default();
    if (credential.photo) {
      credential["photo_url"] = await s3Storage.getTemporaryUrl(credential.photo, 245);
    }
    return credential;
  }
}
exports.GetCredentialService = GetCredentialService;