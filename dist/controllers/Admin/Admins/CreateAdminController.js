"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAdminController = void 0;
var _CreateAdminService = require("../../../services/Admin/Admins/CreateAdminService");
class CreateAdminController {
  async handle(req, res) {
    const {
      name,
      email,
      password,
      access_granted
    } = req.body;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    let userId = req.userId;
    const createAdminService = new _CreateAdminService.CreateAdminService();
    const admin = await createAdminService.execute({
      name,
      email,
      access_granted,
      password,
      photo,
      userId
    });
    return res.json(admin);
  }
}
exports.CreateAdminController = CreateAdminController;