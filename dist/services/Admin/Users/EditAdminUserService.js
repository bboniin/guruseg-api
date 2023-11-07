"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAdminUserService = void 0;

var _bcryptjs = require("bcryptjs");

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditAdminUserService {
  async execute({
    name,
    email,
    signature,
    sector1_id,
    sector2_id,
    sector3_id,
    sector4_id,
    sector5_id,
    phone_number,
    photo,
    id,
    password,
    courseBoolean,
    resaleBoolean,
    courseRestricted
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: id
      }
    });

    if (!email || !name || !phone_number) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    const userExist = await _prisma.default.user.findUnique({
      where: {
        email: email
      }
    });

    if (userExist) {
      if (userExist.email != user.email) {
        throw new Error("Email já está sendo utilizado");
      }
    }

    let data = {
      name: name,
      email: email,
      course: courseBoolean,
      signature: signature,
      phone_number: phone_number,
      sector1_id: sector1_id,
      sector2_id: sector2_id,
      sector3_id: sector3_id,
      sector4_id: sector4_id,
      sector5_id: sector5_id,
      resale: resaleBoolean,
      course_restricted: courseRestricted
    };

    if (password) {
      const passwordHash = await (0, _bcryptjs.hash)(password, 8);
      data["password"] = passwordHash;
    }

    if (photo) {
      const s3Storage = new _S3Storage.default();

      if (user["photo"]) {
        await s3Storage.deleteFile(user["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    }

    const userRes = await _prisma.default.user.update({
      where: {
        id: id
      },
      data: data
    });
    return userRes;
  }

}

exports.EditAdminUserService = EditAdminUserService;