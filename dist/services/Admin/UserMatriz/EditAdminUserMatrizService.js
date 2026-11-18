"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAdminUserMatrizService = void 0;
var _bcryptjs = require("bcryptjs");
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditAdminUserMatrizService {
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
    services,
    phone_number,
    photo,
    id,
    password,
    courses,
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
    modules
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: id
      }
    });
    if (!user) {
      throw new Error("Usuário Matriz não encontrado");
    }
    if (!email || !name || !category || !phone_number) {
      throw new Error("Preencha todos os campos obrigatórios");
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
      category: category,
      phone_number: phone_number,
      sector1_id: sector1_id,
      sector2_id: sector2_id,
      sector3_id: sector3_id,
      sector4_id: sector4_id,
      sector5_id: sector5_id,
      state: state,
      city: city,
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
    const s3Storage = new _S3Storage.default();
    if (userRes.photo) {
      userRes["photo_url"] = await s3Storage.getTemporaryUrl(userRes.photo, 245);
    }
    return userRes;
  }
}
exports.EditAdminUserMatrizService = EditAdminUserMatrizService;