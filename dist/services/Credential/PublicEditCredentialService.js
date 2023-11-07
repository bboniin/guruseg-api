"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicEditCredentialService = void 0;

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _prisma = _interopRequireDefault(require("../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

var _auth = _interopRequireDefault(require("../../utils/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PublicEditCredentialService {
  async execute({
    id,
    email,
    description,
    photo,
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
    const credential = await _prisma.default.credential.findFirst({
      where: {
        id: id,
        enabled: true
      }
    });

    if (!credential) {
      throw new Error("Credenciado não encontrado ou cadastro já foi concluido.");
    }

    const credentialEmail = await _prisma.default.credential.findUnique({
      where: {
        email: email
      }
    });

    if (credentialEmail) {
      if (credentialEmail.id != credential.id) {
        throw new Error("O email digitado já está sendo usado.");
      }
    }

    if (!email || !description || !password || !name || !phone_number || !rg || !cpf || !state || !city || !served_cities || !birthday || !services || !profession) {
      throw new Error("Preencha todos os campos para salvar.");
    }

    let data = {
      name: name,
      email: email,
      rg: rg,
      phone_number: phone_number,
      state: state,
      city: city,
      served_cities: served_cities,
      birthday: birthday,
      services: services,
      profession: profession,
      description: description,
      cpf: cpf,
      enabled: true,
      visible: true
    };

    if (password) {
      const passwordHash = await (0, _bcryptjs.hash)(password, 8);
      data["password"] = passwordHash;
    }

    if (photo) {
      const s3Storage = new _S3Storage.default();

      if (credential["photo"]) {
        await s3Storage.deleteFile(credential["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    } else {
      if (!credential.photo) {
        throw new Error("Envio da imagem é obrigatório");
      }
    }

    const token = (0, _jsonwebtoken.sign)({
      name: credential.name,
      email: credential.email
    }, _auth.default.jwt.secret, {
      subject: credential.id,
      expiresIn: '365d'
    });
    await _prisma.default.credential.update({
      where: {
        id: id
      },
      data: data
    });
    return {
      id: credential.id,
      token
    };
  }

}

exports.PublicEditCredentialService = PublicEditCredentialService;