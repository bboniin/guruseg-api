"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAssociateService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _bcryptjs = require("bcryptjs");
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
var _functions = require("../../../config/functions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateAssociateService {
  async execute({
    name,
    email,
    password,
    photo,
    cnpj,
    phone_number,
    cpf,
    comission,
    city,
    accounting_name,
    state,
    user_id
  }) {
    if (!email || !name || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    if (!(0, _functions.validateEmail)(email)) {
      throw new Error("Email é inválido");
    }
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
        email: email
      }
    }));
    if (alreadyExistEmail) {
      throw new Error("Email já cadastrado.");
    }
    if (photo) {
      const s3Storage = new _S3Storage.default();
      await s3Storage.saveFile(photo);
    } else {
      photo = "";
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
    const passwordHash = await (0, _bcryptjs.hash)(password, 8);
    const associate = await _prisma.default.associate.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        photo: photo,
        accounting_name: accounting_name,
        cnpj: cnpj,
        phone_number: phone_number,
        comission: comission,
        city: city,
        cpf: cpf,
        state: state,
        user_id: user_id
      }
    });
    return associate;
  }
}
exports.CreateAssociateService = CreateAssociateService;