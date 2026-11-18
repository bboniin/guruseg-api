"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListBannersController = void 0;
var _ListBannersService = require("../../../services/Admin/Banners/ListBannersService");
class ListBannersController {
  async handle(req, res) {
    const listBannersService = new _ListBannersService.ListBannersService();
    const banners = await listBannersService.execute();
    return res.json(banners);
  }
}
exports.ListBannersController = ListBannersController;