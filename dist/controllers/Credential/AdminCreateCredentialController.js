"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminCreateCredentialController = void 0;

var _AdminCreateCredentialService = require("../../services/Credential/AdminCreateCredentialService");

class AdminCreateCredentialController {
  async handle(req, res) {
    const {
      email,
      description,
      password,
      name,
      phone_number,
      rg,
      cpf,
      state,
      city,
      served_cities,
      birthday,
      services,
      profession
    } = req.body;
    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const adminCreateCredentialService = new _AdminCreateCredentialService.AdminCreateCredentialService();
    const credential = await adminCreateCredentialService.execute({
      email,
      photo,
      description,
      password,
      name,
      phone_number,
      rg,
      cpf,
      state,
      city,
      served_cities,
      birthday,
      services,
      profession
    });
    return res.json(credential);
  }

}

exports.AdminCreateCredentialController = AdminCreateCredentialController;