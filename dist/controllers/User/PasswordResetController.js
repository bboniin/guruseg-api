"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordResetController = void 0;

var _PasswordResetService = require("../../services/User/PasswordResetService");

class PasswordResetController {
  async handle(req, res) {
    const {
      code
    } = req.params;
    const {
      password
    } = req.body;
    const passwordResetService = new _PasswordResetService.PasswordResetService();
    const message = await passwordResetService.execute({
      code,
      password
    });
    return res.json(message);
  }

}

exports.PasswordResetController = PasswordResetController;