"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthAdminController = void 0;

var _AuthAdminService = require("../../services/Admin/AuthAdminService");

class AuthAdminController {
  async handle(req, res) {
    const {
      email,
      password
    } = req.body;
    const authAdminService = new _AuthAdminService.AuthAdminService();
    const admin = await authAdminService.execute({
      email,
      password
    });
    return res.json(admin);
  }

}

exports.AuthAdminController = AuthAdminController;