"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAdminService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _bcryptjs = require("bcryptjs");
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateAdminService {
  async execute({
    name,
    email,
    userId,
    password,
    photo,
    access_granted
  }) {
    if (!email || !name || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    const admin = await _prisma.default.admin.findFirst({
      where: {
        id: userId
      }
    });
    if (admin?.id != "58e368a8-f71c-40da-a5f6-bcc31a7386ad") {
      throw new Error("Rota restrita ao administrador master");
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
    })) || (await _prisma.default.attendant.findFirst({
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
    const passwordHash = await (0, _bcryptjs.hash)(password, 8);
    const adminCreated = await _prisma.default.admin.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        access_granted: access_granted,
        photo: photo
      }
    });
    return adminCreated;
  }
}
exports.CreateAdminService = CreateAdminService;