"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUserController = void 0;

var _DeleteUserService = require("../../../services/Admin/Users/DeleteUserService");

class DeleteUserController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteUserService = new _DeleteUserService.DeleteUserService();
    const user = await deleteUserService.execute({
      id
    });
    return res.json(user);
  }

}

exports.DeleteUserController = DeleteUserController;