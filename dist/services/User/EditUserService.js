"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditUserService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditUserService {
  async execute({
    name,
    email,
    phone_number,
    photo,
    userId
  }) {
    const userRes = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!email || !name || !phone_number) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    let data = {
      name: name,
      email: email,
      phone_number: phone_number
    };

    if (photo) {
      const s3Storage = new _S3Storage.default();
      const userImage = await _prisma.default.user.findUnique({
        where: {
          id: userId
        }
      });

      if (userImage["photo"]) {
        await s3Storage.deleteFile(userImage["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    }

    const user = await _prisma.default.user.update({
      where: {
        id: userId
      },
      data: data
    });
    return user;
  }

}

exports.EditUserService = EditUserService;