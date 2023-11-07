"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordVerifyResetController = void 0;

var _PasswordVerifyResetService = require("../../services/User/PasswordVerifyResetService");

class PasswordVerifyResetController {
  async handle(req, res) {
    const {
      code
    } = req.params;
    const passwordVerifyResetService = new _PasswordVerifyResetService.PasswordVerifyResetService();
    const message = await passwordVerifyResetService.execute({
      code
    });
    return res.json(message);
  }

}

exports.PasswordVerifyResetController = PasswordVerifyResetController;