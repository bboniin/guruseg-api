"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCollaboratorController = void 0;

var _EditCollaboratorService = require("../../services/Collaborator/EditCollaboratorService");

class EditCollaboratorController {
  async handle(req, res) {
    const {
      name,
      email,
      phone_number
    } = req.body;
    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    let collaboratorId = req.userId;
    const editCollaboratorService = new _EditCollaboratorService.EditCollaboratorService();
    const collaborator = await editCollaboratorService.execute({
      name,
      email,
      phone_number,
      photo,
      collaboratorId
    });
    return res.json(collaborator);
  }

}

exports.EditCollaboratorController = EditCollaboratorController;