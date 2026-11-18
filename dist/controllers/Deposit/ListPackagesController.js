"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListPackagesController = void 0;
var _ListPackagesService = require("../../services/Deposit/ListPackagesService");
class ListPackagesController {
  async handle(req, res) {
    const listPackagesService = new _ListPackagesService.ListPackagesService();
    const packages = await listPackagesService.execute();
    return res.json(packages);
  }
}
exports.ListPackagesController = ListPackagesController;