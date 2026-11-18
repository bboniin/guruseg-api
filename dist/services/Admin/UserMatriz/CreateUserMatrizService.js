"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserMatrizService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _bcryptjs = require("bcryptjs");
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateUserMatrizService {
  async execute({
    name,
    email,
    city,
    state,
    category,
    sector1_id,
    sector2_id,
    sector3_id,
    sector4_id,
    sector5_id,
    phone_number,
    password,
    photo,
    services,
    modules,
    leads_enabled,
    courses_enabled,
    marketing_enabled,
    credentials_enabled,
    value_pcmso,
    value_ltcat_atr,
    value_ltcat_medico,
    value_pgr_atr,
    value_lip,
    value_li,
    value_lp,
    courses
  }) {
    if (!email || !name || !phone_number || !category || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
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
        category: category,
        type: "matriz",
        password: passwordHash,
        phone_number: phone_number,
        photo: photo,
        city: city,
        state: state,
        sector1_id: sector1_id,
        sector2_id: sector2_id,
        sector3_id: sector3_id,
        sector4_id: sector4_id,
        sector5_id: sector5_id,
        leads_enabled: leads_enabled,
        courses_enabled: courses_enabled,
        marketing_enabled: marketing_enabled,
        credentials_enabled: credentials_enabled,
        value_pcmso: value_pcmso,
        value_ltcat_atr: value_ltcat_atr,
        value_ltcat_medico: value_ltcat_medico,
        value_pgr_atr: value_pgr_atr,
        value_lip: value_lip,
        value_li: value_li,
        value_lp: value_lp,
        services: services,
        modules: modules,
        courses: courses
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        type: true
      }
    });
    return user;
  }
}
exports.CreateUserMatrizService = CreateUserMatrizService;