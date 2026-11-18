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
    return res.json(collaborator);
  }
}
exports.GetCollaboratorController = GetCollaboratorController;