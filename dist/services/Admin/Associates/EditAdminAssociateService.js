"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAdminAssociateService = void 0;
var _bcryptjs = require("bcryptjs");
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
var _functions = require("../../../config/functions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditAdminAssociateService {
  async execute({
    password,
    name,
    email,
    photo,
    id,
    cnpj,
    accounting_name,
    cpf,
    phone_number,
    comission,
    city,
    state,
    user_id
  }) {
    const associate = await _prisma.default.associate.findUnique({
      where: {
        id: id
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
            not: id
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
    let data = {
      name: name || associate.name,
      email: email || associate.email,
      cnpj: cnpj || associate.cnpj,
      accounting_name: accounting_name || associate.accounting_name,
      phone_number: phone_number || associate.phone_number,
      comission: comission || associate.comission,
      city: city || associate.city,
      state: state || associate.state,
      cpf: cpf || associate.cpf,
      user_id: user_id
    };
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
        id: id
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
exports.EditAdminAssociateService = EditAdminAssociateService;