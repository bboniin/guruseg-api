"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCollaboratorAdminController = void 0;

var _GetCollaboratorAdminService = require("../../../services/Admin/Collaborators/GetCollaboratorAdminService");

class GetCollaboratorAdminController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getCollaboratorAdminService = new _GetCollaboratorAdminService.GetCollaboratorAdminService();
    const collaborator = await getCollaboratorAdminService.execute({
      id
    });

    if (collaborator) {
      if (collaborator["photo"]) {
        collaborator["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + collaborator["photo"];
      }
    }

    return res.json(collaborator);
  }

}

exports.GetCollaboratorAdminController = GetCollaboratorAdminController;