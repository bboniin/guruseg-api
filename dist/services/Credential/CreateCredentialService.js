"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCredentialService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _auth = _interopRequireDefault(require("../../utils/auth"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateCredentialService {
  async execute({
    email,
    photo,
    description,
    password,
    name,
    phone_number,
    rg,
    cpf,
    state,
    city,
    served_cities,
    birthday,
    services,
    profession
  }) {
    if (!email || !name) {
      throw new Error("Preencha pelo menos o nome e email para cadastrar o credenciado.");
    }

    const credentialEmail = await _prisma.default.credential.findUnique({
      where: {
        email: email
      }
    });

    if (credentialEmail) {
      throw new Error("O email digitado já está sendo usado.");
    }

    if (!email || !photo || !description || !password || !name || !phone_number || !rg || !cpf || !state || !city || !served_cities || !birthday || !services || !profession) {
      throw new Error("Preencha todos os campos para salvar.");
    }

    if (photo) {
      const s3Storage = new _S3Storage.default();
      const upload = await s3Storage.saveFile(photo);
      photo = upload;
    }

    if (password) {
      const passwordHash = await (0, _bcryptjs.hash)(password, 8);
      password = passwordHash;
    }

    const credential = await _prisma.default.credential.create({
      data: {
        email,
        password,
        name,
        phone_number,
        rg,
        cpf,
        state,
        photo,
        description,
        city,
        served_cities,
        birthday,
        services,
        profession,
        enabled: true
      }
    });
    const token = (0, _jsonwebtoken.sign)({
      name: credential.name,
      email: credential.email
    }, _auth.default.jwt.secret, {
      subject: credential.id,
      expiresIn: '365d'
    });
    return {
      id: credential.id,
      token
    };
  }

}

exports.CreateCredentialService = CreateCredentialService;