"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCollaboratorService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("./../../utils/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      expiresIn: '365d'
    });

    if (!passwordMatch) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }

    let photo_url = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + collaborator.photo;
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