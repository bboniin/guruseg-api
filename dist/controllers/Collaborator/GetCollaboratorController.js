"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCollaboratorController = void 0;

var _GetCollaboratorService = require("../../services/Collaborator/GetCollaboratorService");

class GetCollaboratorController {
  async handle(req, res) {
    let userId = req.userId;
    const getCollaboratorService = new _GetCollaboratorService.GetCollaboratorService();
    const collaborator = await getCollaboratorService.execute({
      userId
    });

    if (collaborator) {
      if (collaborator["photo"]) {
        collaborator["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + collaborator["photo"];
      }
    }

    return res.json(collaborator);
  }

}

exports.GetCollaboratorController = GetCollaboratorController;