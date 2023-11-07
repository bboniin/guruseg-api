"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCollaboratorController = void 0;

var _CreateCollaboratorService = require("../../../services/Admin/Collaborators/CreateCollaboratorService");

class CreateCollaboratorController {
  async handle(req, res) {
    const {
      name,
      email,
      password,
      phone_number,
      sector,
      enabled
    } = req.body;
    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const createCollaboratorService = new _CreateCollaboratorService.CreateCollaboratorService();
    const collaborator = await createCollaboratorService.execute({
      name,
      email,
      phone_number,
      password,
      photo,
      sector,
      enabled: enabled == "true" ? true : false
    });
    return res.json(collaborator);
  }

}

exports.CreateCollaboratorController = CreateCollaboratorController;