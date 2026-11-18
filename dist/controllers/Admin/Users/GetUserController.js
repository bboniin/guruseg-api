"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserAdminController = void 0;
var _GetUserAdminService = require("../../../services/Admin/Users/GetUserAdminService");
class GetUserAdminController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getUserAdminService = new _GetUserAdminService.GetUserAdminService();
    const user = await getUserAdminService.execute({
      id
    });
    return res.json(user);
  }
}
exports.GetUserAdminController = GetUserAdminController;