"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _bcryptjs = require("bcryptjs");

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateUserService {
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
    password,
    photo,
    courseBoolean,
    resaleBoolean,
    courseRestricted
  }) {
    if (!email || !name || !phone_number || !password) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    const userAlreadyExists = await _prisma.default.user.findFirst({
      where: {
        email: email
      }
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrado.");
    }

    if (photo) {
      const s3Storage = new _S3Storage.default();
      await s3Storage.saveFile(photo);
    } else {
      photo = "";
    }

    const passwordHash = await (0, _bcryptjs.hash)(password, 8);
    const user = await _prisma.default.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        phone_number: phone_number,
        photo: photo,
        signature: signature,
        sector1_id: sector1_id,
        sector2_id: sector2_id,
        sector3_id: sector3_id,
        sector4_id: sector4_id,
        sector5_id: sector5_id,
        course: courseBoolean,
        resale: resaleBoolean,
        course_restricted: courseRestricted
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true
      }
    });
    return user;
  }

}

exports.CreateUserService = CreateUserService;