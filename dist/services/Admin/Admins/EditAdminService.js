"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAdminService = void 0;
var _bcryptjs = require("bcryptjs");
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditAdminService {
  async execute({
    name,
    password,
    email,
    photo,
    id,
    access_granted,
    userId
  }) {
    const admin = await _prisma.default.admin.findFirst({
      where: {
        id: userId
      }
    });
    if (admin?.id != "58e368a8-f71c-40da-a5f6-bcc31a7386ad" && id != userId) {
      throw new Error("Rota restrita ao administrador master");
    }
    const adminGet = await _prisma.default.admin.findUnique({
      where: {
        id: id
      }
    });
    if (!admin) {
      throw new Error("Administrador não encontrado");
    }
    if (!email || !name) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    const alreadyExistEmail = (await _prisma.default.admin.findFirst({
      where: {
        email: email,
        id: {
          not: id
        }
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
    let data = {
      name: name,
      email: email,
      access_granted: access_granted
    };
    if (password) {
      const passwordHash = await (0, _bcryptjs.hash)(password, 8);
      data["password"] = passwordHash;
    }
    if (photo) {
      const s3Storage = new _S3Storage.default();
      if (adminGet["photo"]) {
        await s3Storage.deleteFile(adminGet["photo"]);
      }
      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    }
    const adminEdited = await _prisma.default.admin.update({
      where: {
        id: id
      },
      data: data
    });
    const s3Storage = new _S3Storage.default();
    if (adminEdited.photo) {
      adminEdited["photo_url"] = await s3Storage.getTemporaryUrl(adminEdited.photo, 245);
    }
    return adminEdited;
  }
}
exports.EditAdminService = EditAdminService;