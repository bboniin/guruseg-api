"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListBannersController = void 0;

var _ListBannersService = require("../../../services/Admin/Banners/ListBannersService");

class ListBannersController {
  async handle(req, res) {
    let userId = req.userId;
    const listBannersService = new _ListBannersService.ListBannersService();
    const banners = await listBannersService.execute({
      userId
    });
    banners.map(item => {
      if (item["photo"]) {
        item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });
    return res.json(banners);
  }

}

exports.ListBannersController = ListBannersController;