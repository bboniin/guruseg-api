"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBannerController = void 0;
var _EditBannerService = require("../../../services/Admin/Banners/EditBannerService");
class EditBannerController {
  async handle(req, res) {
    const {
      url,
      types
    } = req.body;
    const {
      id
    } = req.params;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    const editBannerService = new _EditBannerService.EditBannerService();
    const banner = await editBannerService.execute({
      url,
      types,
      photo,
      id
    });
    return res.json(banner);
  }
}
exports.EditBannerController = EditBannerController;