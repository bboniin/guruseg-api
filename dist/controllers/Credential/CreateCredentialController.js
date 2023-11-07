"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCredentialController = void 0;

var _CreateCredentialService = require("../../services/Credential/CreateCredentialService");

class CreateCredentialController {
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

    const createCredentialService = new _CreateCredentialService.CreateCredentialService();
    const credential = await createCredentialService.execute({
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

exports.CreateCredentialController = CreateCredentialController;