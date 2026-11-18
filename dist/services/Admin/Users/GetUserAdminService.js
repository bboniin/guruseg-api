"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserAdminService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetUserAdminService {
  async execute({
    id
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        email: true,
        modules: true,
        sector1_id: true,
        sector2_id: true,
        sector3_id: true,
        sector4_id: true,
        sector5_id: true,
        services: true,
        phone_number: true,
        costumer_id: true,
        category: true,
        city: true,
        state: true,
        photo: true,
        courses: true,
        leads_enabled: true,
        courses_enabled: true,
        marketing_enabled: true,
        credentials_enabled: true,
        value_pcmso: true,
        value_ltcat_atr: true,
        value_ltcat_medico: true,
        value_pgr_atr: true,
        value_lip: true,
        value_li: true,
        value_lp: true
      }
    });
    if (!user) {
      throw new Error("Franqueado não foi encontrado.");
    }
    const s3Storage = new _S3Storage.default();
    if (user.photo) {
      user["photo_url"] = await s3Storage.getTemporaryUrl(user.photo, 245);
    }
    return user;
  }
}
exports.GetUserAdminService = GetUserAdminService;