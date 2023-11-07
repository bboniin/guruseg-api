"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditUserController = void 0;

var _EditUserService = require("../../services/User/EditUserService");

class EditUserController {
  async handle(req, res) {
    const {
      name,
      email,
      phone_number
    } = req.body;
    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    let userId = req.userId;
    const editUserService = new _EditUserService.EditUserService();
    const user = await editUserService.execute({
      name,
      email,
      phone_number,
      photo,
      userId
    });
    return res.json(user);
  }

}

exports.EditUserController = EditUserController;