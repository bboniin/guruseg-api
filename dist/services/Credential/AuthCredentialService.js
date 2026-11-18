"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCredentialService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _bcryptjs = require("bcryptjs");
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../utils/auth"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AuthCredentialService {
  async execute({
    email,
    password
  }) {
    const credential = await _prisma.default.credential.findFirst({
      where: {
        email: email
      }
    });
    if (!credential) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }
    const passwordMatch = await (0, _bcryptjs.compare)(password, credential.password);
    const token = (0, _jsonwebtoken.sign)({
      name: credential.name,
      email: credential.email
    }, _auth.default.jwt.secret, {
      subject: credential.id,
      expiresIn: "365d"
    });
    if (!passwordMatch) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }
    const s3Storage = new _S3Storage.default();
    const photo_url = credential.photo ? await s3Storage.getTemporaryUrl(credential.photo, 245) : "";
    return {
      credential: {
        id: credential.id,
        name: credential.name,
        email: credential.email,
        type: "credential",
        photo: credential.photo,
        photo_url: photo_url,
        phone_number: credential.phone_number
      },
      token
    };
  }
}
exports.AuthCredentialService = AuthCredentialService;