"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetOccupationalController = void 0;
var _GetOccupationalService = require("../../services/IA/GetOccupationalService");
class GetOccupationalController {
  async handle(req, res) {
    const {
      name
    } = req.query;
    const getOccupationalService = new _GetOccupationalService.GetOccupationalService();
    const resOccupational = await getOccupationalService.execute({
      name: String(name || "")
    });
    return res.json(resOccupational);
  }
}
exports.GetOccupationalController = GetOccupationalController;