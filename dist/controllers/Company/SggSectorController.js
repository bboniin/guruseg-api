"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SggSectorController = void 0;
var _SggSectorService = require("../../services/Company/SggSectorService");
class SggSectorController {
  async handle(req, res) {
    const {
      sgg_id
    } = req.body;
    const {
      sector_id
    } = req.params;
    const sggSectorService = new _SggSectorService.SggSectorService();
    const Sector = await sggSectorService.execute({
      sector_id: sector_id,
      sgg_id
    });
    return res.json(Sector);
  }
}
exports.SggSectorController = SggSectorController;