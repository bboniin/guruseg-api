"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAdminCollaboratorService = void 0;

var _bcryptjs = require("bcryptjs");

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditAdminCollaboratorService {
  async execute({
    password,
    name,
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
      throw new Error("Preencha todos os campos obrigátorios");
    }

    const collaboratorExist = await _prisma.default.collaborator.findUnique({
      where: {
        email: email
      }
    });

    if (collaboratorExist) {
      if (collaboratorExist.email != collaborator.email) {
        throw new Error("Email já está sendo utilizado");
      }
    }

    let data = {
      name: name,
      email: email,
      enabled: enabled,
      phone_number: phone_number,
      sector: sector
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
    return collaboratorR;
  }

}

exports.EditAdminCollaboratorService = EditAdminCollaboratorService;