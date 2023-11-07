"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteBannerController = void 0;

var _DeleteBannerService = require("../../../services/Admin/Banners/DeleteBannerService");

class DeleteBannerController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const deleteBannerService = new _DeleteBannerService.DeleteBannerService();
    const banner = await deleteBannerService.execute({
      id,
      userId
    });
    return res.json(banner);
  }

}

exports.DeleteBannerController = DeleteBannerController;