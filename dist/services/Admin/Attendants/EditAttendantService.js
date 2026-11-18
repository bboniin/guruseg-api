"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAttendantService = void 0;
var _bcryptjs = require("bcryptjs");
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditAttendantService {
  async execute({
    password,
    name,
    email,
    photo,
    id,
    enabled
  }) {
    if (!email || !name) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    const attendant = await _prisma.default.attendant.findUnique({
      where: {
        id: id
      }
    });
    if (!attendant) {
      throw new Error("Atendente não encontrado");
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
        email: email,
        id: {
          not: id
        }
      }
    }));
    if (alreadyExistEmail) {
      throw new Error("Email já cadastrado.");
    }
    let data = {
      name: name,
      email: email,
      enabled: enabled
    };
    if (password) {
      const passwordHash = await (0, _bcryptjs.hash)(password, 8);
      data["password"] = passwordHash;
    }
    if (photo) {
      const s3Storage = new _S3Storage.default();
      if (attendant["photo"]) {
        await s3Storage.deleteFile(attendant["photo"]);
      }
      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    }
    const attendantEdited = await _prisma.default.attendant.update({
      where: {
        id: id
      },
      data: data
    });
    const s3Storage = new _S3Storage.default();
    if (attendantEdited.photo) {
      attendantEdited["photo_url"] = await s3Storage.getTemporaryUrl(attendantEdited.photo, 245);
    }
    return attendantEdited;
  }
}
exports.EditAttendantService = EditAttendantService;