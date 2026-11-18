"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeletePackageController = void 0;
var _DeletePackageService = require("../../services/Deposit/DeletePackageService");
class DeletePackageController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deletePackageService = new _DeletePackageService.DeletePackageService();
    const packageRes = await deletePackageService.execute({
      id
    });
    return res.json(packageRes);
  }
}
exports.DeletePackageController = DeletePackageController;