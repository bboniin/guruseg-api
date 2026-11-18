"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAdminCollaboratorService = void 0;
var _bcryptjs = require("bcryptjs");
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditAdminCollaboratorService {
  async execute({
    password,
    name,
    user_id,
    email,
    phone_number,
    photo,
    id,
    sector,
    enabled
  }) {
    const collaborator = await _prisma.default.collaborator.findUnique({
      where: {
        id: id
      }
    });
    if (!email || !name || !phone_number) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    const collaboratorExistEmail = await _prisma.default.collaborator.findFirst({
      where: {
        email: email
      }
    });
    if (collaboratorExistEmail) {
      if (collaboratorExistEmail.email != collaborator.email) {
        throw new Error("Email já está sendo utilizado");
      }
    }
    if (user_id) {
      const collaboratorExistUser = await _prisma.default.collaborator.findFirst({
        where: {
          sector: sector,
          user_id: user_id,
          visible: true
        }
      });
      if (collaboratorExistUser) {
        if (collaboratorExistUser.id != collaborator.id || collaboratorExistUser.user_id != collaborator.user_id) {
          throw new Error("Franqueado já vinculado a outro técnico desse setor.");
        }
      }
    }
    let data = {
      name: name,
      email: email,
      enabled: enabled,
      phone_number: phone_number,
      sector: sector,
      user_id: user_id
    };
    if (password) {
      const passwordHash = await (0, _bcryptjs.hash)(password, 8);
      data["password"] = passwordHash;
    }
    if (photo) {
      const s3Storage = new _S3Storage.default();
      if (collaborator["photo"]) {
        await s3Storage.deleteFile(collaborator["photo"]);
      }
      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    }
    const collaboratorR = await _prisma.default.collaborator.update({
      where: {
        id: id
      },
      data: data
    });
    const s3Storage = new _S3Storage.default();
    if (collaboratorR.photo) {
      collaboratorR["photo_url"] = await s3Storage.getTemporaryUrl(collaboratorR.photo, 245);
    }
    return collaboratorR;
  }
}
exports.EditAdminCollaboratorService = EditAdminCollaboratorService;