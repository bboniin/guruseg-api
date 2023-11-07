"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicEditCredentialController = void 0;

var _PublicEditCredentialService = require("../../services/Credential/PublicEditCredentialService");

class PublicEditCredentialController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      email,
      password,
      name,
      description,
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

    const publicEditCredentialService = new _PublicEditCredentialService.PublicEditCredentialService();
    const credential = await publicEditCredentialService.execute({
      id,
      description,
      photo,
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

exports.PublicEditCredentialController = PublicEditCredentialController;