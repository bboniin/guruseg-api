"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCollaboratorService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditCollaboratorService {
  async execute({
    name,
    email,
    phone_number,
    photo,
    collaboratorId
  }) {
    if (!email || !name || !phone_number) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    const collaboratorExist = await _prisma.default.collaborator.findUnique({
      where: {
        email: email
      }
    });

    if (collaboratorExist) {
      throw new Error("Email já está sendo utilizado");
    }

    let data = {
      name: name,
      email: email,
      phone_number: phone_number
    };

    if (photo) {
      const s3Storage = new _S3Storage.default();
      const collaboratorImage = await _prisma.default.collaborator.findUnique({
        where: {
          id: collaboratorId
        }
      });

      if (collaboratorImage["photo"]) {
        await s3Storage.deleteFile(collaboratorImage["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    }

    const collaborator = await _prisma.default.collaborator.update({
      where: {
        id: collaboratorId
      },
      data: data
    });
    return collaborator;
  }

}

exports.EditCollaboratorService = EditCollaboratorService;