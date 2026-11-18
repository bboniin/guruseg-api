"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersCollaboratorController = void 0;
var _ListUsersCollaboratorService = require("../../../services/Admin/Collaborators/ListUsersCollaboratorService");
class ListUsersCollaboratorController {
  async handle(req, res) {
    let {
      collaborator_id
    } = req.params;
    let userId = req.userId;
    const listUsersCollaboratorService = new _ListUsersCollaboratorService.ListUsersCollaboratorService();
    const collaborators = await listUsersCollaboratorService.execute({
      userId,
      collaborator_id
    });
    return res.json(collaborators);
  }
}
exports.ListUsersCollaboratorController = ListUsersCollaboratorController;