"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserMatrizController = void 0;
var _GetUserMatrizAdminService = require("../../../services/Admin/UserMatriz/GetUserMatrizAdminService");
class GetUserMatrizController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getUserMatrizAdminService = new _GetUserMatrizAdminService.GetUserMatrizAdminService();
    const user = await getUserMatrizAdminService.execute({
      id
    });
    return res.json(user);
  }
}
exports.GetUserMatrizController = GetUserMatrizController;