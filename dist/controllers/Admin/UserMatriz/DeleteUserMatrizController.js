"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUserMatrizController = void 0;
var _DeleteUserMatrizService = require("../../../services/Admin/UserMatriz/DeleteUserMatrizService");
class DeleteUserMatrizController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteUserMatrizService = new _DeleteUserMatrizService.DeleteUserMatrizService();
    const user = await deleteUserMatrizService.execute({
      id
    });
    return res.json(user);
  }
}
exports.DeleteUserMatrizController = DeleteUserMatrizController;