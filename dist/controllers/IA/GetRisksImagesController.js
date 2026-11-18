"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetRisksImagesController = void 0;
var _GetRisksImagesService = require("../../services/IA/GetRisksImagesService");
class GetRisksImagesController {
  async handle(req, res) {
    const {
      images
    } = req.query;
    const getRisksImagesService = new _GetRisksImagesService.GetRisksImagesService();
    const resRisks = await getRisksImagesService.execute({
      images: String(images || "")
    });
    return res.json(resRisks);
  }
}
exports.GetRisksImagesController = GetRisksImagesController;