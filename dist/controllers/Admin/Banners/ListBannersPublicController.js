"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListBannersPublicController = void 0;

var _ListBannersPublicService = require("../../../services/Admin/Banners/ListBannersPublicService");

class ListBannersPublicController {
  async handle(req, res) {
    const {
      type
    } = req.query;
    const listBannersPublicService = new _ListBannersPublicService.ListBannersPublicService();
    const bannersPublic = await listBannersPublicService.execute({
      type: String(type)
    });
    bannersPublic.map(item => {
      if (item["photo"]) {
        item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });
    return res.json(bannersPublic);
  }

}

exports.ListBannersPublicController = ListBannersPublicController;