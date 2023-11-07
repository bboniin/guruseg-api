"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateBannerController = void 0;

var _CreateBannerService = require("../../../services/Admin/Banners/CreateBannerService");

class CreateBannerController {
  async handle(req, res) {
    const {
      url,
      types
    } = req.body;
    let photo = "";
    let userId = req.userId;

    if (req.file) {
      photo = req.file.filename;
    }

    const createBannerService = new _CreateBannerService.CreateBannerService();
    const banner = await createBannerService.execute({
      userId,
      url,
      types,
      photo
    });
    return res.json(banner);
  }

}

exports.CreateBannerController = CreateBannerController;