"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SggSectorService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SggSectorService {
  async execute({
    sector_id,
    sgg_id
  }) {
    if (!sgg_id) {
      throw new Error("Código SGG é obrigatorio");
    }
    const sectorGet = await _prisma.default.companySector.findFirst({
      where: {
        id: sector_id
      }
    });
    if (!sectorGet) {
      throw new Error("Formulário não encontrada");
    }
    const sector = await _prisma.default.companySector.update({
      where: {
        id: sector_id
      },
      data: {
        sgg_id: sgg_id
      }
    });
    return sector;
  }
}
exports.SggSectorService = SggSectorService;