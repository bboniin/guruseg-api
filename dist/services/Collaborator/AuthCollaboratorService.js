"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCollaboratorService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _bcryptjs = require("bcryptjs");
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("./../../utils/auth"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AuthCollaboratorService {
  async execute({
    email,
    password
  }) {
    const collaborator = await _prisma.default.collaborator.findFirst({
      where: {
        email: email
      }
    });
    if (!collaborator) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }
    const passwordMatch = await (0, _bcryptjs.compare)(password, collaborator.password);
    const token = (0, _jsonwebtoken.sign)({
      name: collaborator.name,
      email: collaborator.email
    }, _auth.default.jwt.secret, {
      subject: collaborator.id,
      expiresIn: "365d"
    });
    if (!passwordMatch) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }
    const s3Storage = new _S3Storage.default();
    const photo_url = collaborator.photo ? await s3Storage.getTemporaryUrl(collaborator.photo, 245) : "";
    return {
      user: {
        id: collaborator.id,
        name: collaborator.name,
        email: collaborator.email,
        type: collaborator.type,
        photo: collaborator.photo,
        photo_url: photo_url,
        phone_number: collaborator.phone_number
      },
      token
    };
  }
}
exports.AuthCollaboratorService = AuthCollaboratorService;