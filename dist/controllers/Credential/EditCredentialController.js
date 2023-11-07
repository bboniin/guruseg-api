"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCredentialController = void 0;

var _EditCredentialService = require("../../services/Credential/EditCredentialService");

class EditCredentialController {
  async handle(req, res) {
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
    let userId = req.userId;
    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const editCredentialService = new _EditCredentialService.EditCredentialService();
    const credential = await editCredentialService.execute({
      userId,
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

exports.EditCredentialController = EditCredentialController;