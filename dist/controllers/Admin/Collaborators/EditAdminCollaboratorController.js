"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAdminCollaboratorController = void 0;
var _EditAdminCollaboratorService = require("../../../services/Admin/Collaborators/EditAdminCollaboratorService");
class EditAdminCollaboratorController {
  async handle(req, res) {
    const {
      name,
      email,
      phone_number,
      user_id,
      password,
      sector,
      enabled
    } = req.body;
    const {
      id
    } = req.params;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    const editAdminCollaboratorService = new _EditAdminCollaboratorService.EditAdminCollaboratorService();
    const collaborator = await editAdminCollaboratorService.execute({
      name,
      email,
      phone_number,
      photo,
      user_id,
      password,
      id,
      sector,
      enabled: enabled == "true" ? true : false
    });
    return res.json(collaborator);
  }
}
exports.EditAdminCollaboratorController = EditAdminCollaboratorController;