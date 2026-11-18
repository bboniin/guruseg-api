"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthAdminService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _bcryptjs = require("bcryptjs");
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("./../../utils/auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AuthAdminService {
  async execute({
    email,
    password
  }) {
    const admin = await _prisma.default.admin.findFirst({
      where: {
        email: email
      }
    });
    if (!admin) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }
    const passwordMatch = await (0, _bcryptjs.compare)(password, admin.password);
    const token = (0, _jsonwebtoken.sign)({
      email: admin.email
    }, _auth.default.jwt.secret, {
      subject: admin.id,
      expiresIn: "365d"
    });
    if (!passwordMatch) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }
    return {
      user: {
        id: admin.id,
        email: admin.email,
        type: admin.type
      },
      token
    };
  }
}
exports.AuthAdminService = AuthAdminService;