"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAdminController = void 0;
var _EditAdminService = require("../../../services/Admin/Admins/EditAdminService");
class EditAdminController {
  async handle(req, res) {
    const {
      name,
      email,
      password,
      access_granted,
      enabled
    } = req.body;
    const {
      id
    } = req.params;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    let userId = req.userId;
    const editAdminService = new _EditAdminService.EditAdminService();
    const admin = await editAdminService.execute({
      name,
      email,
      photo,
      password,
      access_granted,
      userId,
      id
    });
    return res.json(admin);
  }
}
exports.EditAdminController = EditAdminController;