"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditPackageController = void 0;
var _EditPackageService = require("../../services/Deposit/EditPackageService");
class EditPackageController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      value,
      description,
      bonus,
      type
    } = req.body;
    const editPackageService = new _EditPackageService.EditPackageService();
    const packageRes = await editPackageService.execute({
      name,
      value,
      description,
      bonus,
      id,
      type
    });
    return res.json(packageRes);
  }
}
exports.EditPackageController = EditPackageController;