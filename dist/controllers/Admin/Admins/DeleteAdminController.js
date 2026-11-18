"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAdminController = void 0;
var _DeleteAdminService = require("../../../services/Admin/Admins/DeleteAdminService");
class DeleteAdminController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const deleteAdminService = new _DeleteAdminService.DeleteAdminService();
    const admin = await deleteAdminService.execute({
      id,
      userId
    });
    return res.json(admin);
  }
}
exports.DeleteAdminController = DeleteAdminController;