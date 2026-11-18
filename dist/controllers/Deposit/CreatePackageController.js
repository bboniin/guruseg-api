"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePackageController = void 0;
var _CreatePackageService = require("../../services/Deposit/CreatePackageService");
class CreatePackageController {
  async handle(req, res) {
    const {
      name,
      value,
      description,
      bonus,
      type
    } = req.body;
    const createPackageService = new _CreatePackageService.CreatePackageService();
    const packageRes = await createPackageService.execute({
      name,
      value,
      bonus,
      description,
      type
    });
    return res.json(packageRes);
  }
}
exports.CreatePackageController = CreatePackageController;