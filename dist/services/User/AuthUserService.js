"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthUserService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("./../../utils/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthUserService {
  async execute({
    email,
    password
  }) {
    const user = await _prisma.default.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }

    const passwordMatch = await (0, _bcryptjs.compare)(password, user.password);
    const token = (0, _jsonwebtoken.sign)({
      name: user.name,
      email: user.email
    }, _auth.default.jwt.secret, {
      subject: user.id,
      expiresIn: '365d'
    });

    if (!passwordMatch) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }

    let photo_url = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + user.photo;
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        photo: user.photo,
        photo_url: photo_url,
        phone_number: user.phone_number
      },
      token
    };
  }

}

exports.AuthUserService = AuthUserService;