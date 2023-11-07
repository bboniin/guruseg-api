"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCollaboratorService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _bcryptjs = require("bcryptjs");

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateCollaboratorService {
  async execute({
    name,
    email,
    phone_number,
    password,
    photo,
    sector,
    enabled
  }) {
    if (!email || !name || !phone_number || !password || !sector) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    const collaboratorAlreadyExists = await _prisma.default.collaborator.findFirst({
      where: {
        email: email
      }
    });

    if (collaboratorAlreadyExists) {
      throw new Error("Email já cadastrado.");
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
        sector: sector
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