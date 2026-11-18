"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAssociateService = void 0;
var _bcryptjs = require("bcryptjs");
var _functions = require("../../config/functions");
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditAssociateService {
  async execute({
    name,
    email,
    phone_number,
    photo,
    cpf,
    key_pix,
    type_pix,
    password,
    associateId,
    cnpj,
    comission,
    city,
    state,
    terms_accepted
  }) {
    const associate = await _prisma.default.associate.findUnique({
      where: {
        id: associateId
      }
    });
    if (!associate) {
      throw new Error("Associado não encontrado");
    }
    if (email && !(0, _functions.validateEmail)(email)) {
      throw new Error("Email é inválido");
    }
    if (email) {
      const alreadyExistEmail = (await _prisma.default.admin.findFirst({
        where: {
          email: email
        }
      })) || (await _prisma.default.user.findFirst({
        where: {
          email: email
        }
      })) || (await _prisma.default.collaborator.findFirst({
        where: {
          email: email
        }
      })) || (await _prisma.default.associate.findFirst({
        where: {
          email: email,
          id: {
            not: associateId
          }
        }
      }));
      if (alreadyExistEmail) {
        throw new Error("Email já cadastrado.");
      }
    }
    if (cpf && !(0, _functions.validateCpf)(cpf)) {
      throw new Error("CPF é inválido");
    }
    if (cnpj && !(0, _functions.validateCnpj)(cnpj)) {
      throw new Error("CNPJ é inválido");
    }
    if (phone_number && !(0, _functions.validatePhone)(phone_number)) {
      throw new Error("Telefone é inválido");
    }
    if (type_pix && !key_pix) {
      throw new Error("Preencha a chave pix");
    }
    if (key_pix && type_pix) {
      if (type_pix == "EMAIL") {
        if (!(0, _functions.validateEmail)(key_pix)) {
          throw new Error("Chave PIX Email é inválido");
        }
      }
      if (type_pix == "CPF") {
        if (!(0, _functions.validateCpf)(key_pix)) {
          throw new Error("Chave PIX CPF é inválido");
        }
      }
      if (type_pix == "CNPJ") {
        if (!(0, _functions.validateCnpj)(key_pix)) {
          throw new Error("Chave PIX CNPJ é inválido");
        }
      }
      if (type_pix == "PHONE") {
        if (!(0, _functions.validatePhone)(key_pix)) {
          throw new Error("Chave PIX Telefone é inválido");
        }
      }
    }
    let data = {
      name: name || associate.name,
      email: email || associate.email,
      cnpj: cnpj || associate.cnpj,
      phone_number: phone_number || associate.phone_number,
      comission: comission || associate.comission,
      city: city || associate.city,
      state: state || associate.state,
      key_pix: key_pix && type_pix ? key_pix : associate.key_pix,
      type_pix: key_pix && type_pix ? type_pix : associate.type_pix,
      cpf: cpf || associate.cpf
    };
    if (terms_accepted) {
      data["terms_accepted"] = true;
      data["terms_accepted_at"] = new Date();
    }
    if (password) {
      const passwordHash = await (0, _bcryptjs.hash)(password, 8);
      data["password"] = passwordHash;
    }
    if (photo) {
      const s3Storage = new _S3Storage.default();
      if (associate["photo"]) {
        await s3Storage.deleteFile(associate["photo"]);
      }
      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    }
    const associateEdited = await _prisma.default.associate.update({
      where: {
        id: associateId
      },
      data: data
    });
    const s3Storage = new _S3Storage.default();
    if (associateEdited.photo) {
      associateEdited["photo_url"] = await s3Storage.getTemporaryUrl(associateEdited.photo, 245);
    }
    return associateEdited;
  }
}
exports.EditAssociateService = EditAssociateService;