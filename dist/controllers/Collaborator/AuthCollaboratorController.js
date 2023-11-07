"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCollaboratorController = void 0;

var _AuthCollaboratorService = require("../../services/Collaborator/AuthCollaboratorService");

class AuthCollaboratorController {
  async handle(req, res) {
    const {
      email,
      password
    } = req.body;
    const authCollaboratorService = new _AuthCollaboratorService.AuthCollaboratorService();
    const collaborator = await authCollaboratorService.execute({
      email,
      password
    });
    return res.json(collaborator);
  }

}

exports.AuthCollaboratorController = AuthCollaboratorController;