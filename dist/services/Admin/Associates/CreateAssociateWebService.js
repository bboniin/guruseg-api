"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAssociateWebService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _bcryptjs = require("bcryptjs");
var _functions = require("../../../config/functions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateAssociateWebService {
  async execute({
    name,
    email,
    phone_number,
    city,
    accounting_name,
    state
  }) {
    if (!email || !name || !phone_number) {
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
    const password = phone_number.slice(-4);
    const passwordHash = await (0, _bcryptjs.hash)(password, 8);
    const associate = await _prisma.default.associate.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        accounting_name: accounting_name,
        phone_number: phone_number,
        comission: 20,
        city: city,
        user_id: "a988da0a-eaa3-4817-b3b1-c7cd292bb805",
        state: state
      }
    });
    console.log(associate);
    return associate;
  }
}
exports.CreateAssociateWebService = CreateAssociateWebService;