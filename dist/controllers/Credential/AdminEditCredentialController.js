"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminEditCredentialController = void 0;

var _AdminEditCredentialService = require("../../services/Credential/AdminEditCredentialService");

class AdminEditCredentialController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      email,
      visible,
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

    const adminEditCredentialService = new _AdminEditCredentialService.AdminEditCredentialService();
    const credential = await adminEditCredentialService.execute({
      id,
      photo,
      visible: visible == "true" ? true : false,
      description,
      email,
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

exports.AdminEditCredentialController = AdminEditCredentialController;