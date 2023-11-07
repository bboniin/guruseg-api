"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminEditCredentialService = void 0;

var _bcryptjs = require("bcryptjs");

var _prisma = _interopRequireDefault(require("../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AdminEditCredentialService {
  async execute({
    id,
    visible,
    description,
    photo,
    email,
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
    const credential = await _prisma.default.credential.findUnique({
      where: {
        id: id
      }
    });
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

    if (!email || !description || !name || !phone_number || !rg || !cpf || !state || !city || !served_cities || !birthday || !services || !profession) {
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
      visible: visible,
      enabled: true
    };

    if (password) {
      const passwordHash = await (0, _bcryptjs.hash)(password, 8);
      data["password"] = passwordHash;
    } else {
      if (!credential.password) {
        throw new Error("Senha é obrigatório para efetuar o login");
      }
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

    const credentialEdit = await _prisma.default.credential.update({
      where: {
        id: id
      },
      data: data
    });
    return credentialEdit;
  }

}

exports.AdminEditCredentialService = AdminEditCredentialService;