"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCredentialController = void 0;

var _AuthCredentialService = require("../../services/Credential/AuthCredentialService");

class AuthCredentialController {
  async handle(req, res) {
    const {
      email,
      password
    } = req.body;
    const authCredentialService = new _AuthCredentialService.AuthCredentialService();
    const credential = await authCredentialService.execute({
      email,
      password
    });
    return res.json(credential);
  }

}

exports.AuthCredentialController = AuthCredentialController;