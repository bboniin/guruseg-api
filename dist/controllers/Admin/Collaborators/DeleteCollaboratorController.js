"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCollaboratorController = void 0;

var _DeleteCollaboratorService = require("../../../services/Admin/Collaborators/DeleteCollaboratorService");

class DeleteCollaboratorController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteCollaboratorService = new _DeleteCollaboratorService.DeleteCollaboratorService();
    const collaborator = await deleteCollaboratorService.execute({
      id
    });
    return res.json(collaborator);
  }

}

exports.DeleteCollaboratorController = DeleteCollaboratorController;