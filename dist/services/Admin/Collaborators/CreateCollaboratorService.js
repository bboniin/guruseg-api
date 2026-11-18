"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCollaboratorService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _bcryptjs = require("bcryptjs");
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateCollaboratorService {
  async execute({
    name,
    email,
    phone_number,
    user_id,
    password,
    photo,
    sector,
    enabled
  }) {
    if (!email || !name || !phone_number || !password || !sector) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    const collaboratorAlreadyExistEmail = await _prisma.default.collaborator.findFirst({
      where: {
        email: email
      }
    });
    if (collaboratorAlreadyExistEmail) {
      throw new Error("Email já cadastrado.");
    }
    if (user_id) {
      const collaboratorAlreadyExistUser = await _prisma.default.collaborator.findFirst({
        where: {
          sector: sector,
          user_id: user_id,
          visible: true
        }
      });
      if (collaboratorAlreadyExistUser) {
        throw new Error("Franqueado já vinculado a outro técnico desse setor.");
      }
    }
    if (photo) {
      const s3Storage = new _S3Storage.default();
      await s3Storage.saveFile(photo);
    } else {
      photo = "";
    }
    const passwordHash = await (0, _bcryptjs.hash)(password, 8);
    const collaborator = await _prisma.default.collaborator.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        phone_number: phone_number,
        photo: photo,
        enabled: enabled,
        sector: sector,
        user_id: user_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true
      }
    });
    return collaborator;
  }
}
exports.CreateCollaboratorService = CreateCollaboratorService;