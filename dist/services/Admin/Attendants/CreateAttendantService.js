"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAttendantService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _bcryptjs = require("bcryptjs");
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateAttendantService {
  async execute({
    name,
    email,
    password,
    photo
  }) {
    if (!email || !name || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
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
    const attendant = await _prisma.default.attendant.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        photo: photo
      }
    });
    return attendant;
  }
}
exports.CreateAttendantService = CreateAttendantService;