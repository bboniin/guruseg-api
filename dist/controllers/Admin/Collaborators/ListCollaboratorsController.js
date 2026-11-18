"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCollaboratorsController = void 0;
var _ListCollaboratorsService = require("../../../services/Admin/Collaborators/ListCollaboratorsService");
class ListCollaboratorsController {
  async handle(req, res) {
    let userId = req.userId;
    const {
      filter,
      page,
      all
    } = req.query;
    const listCollaboratorsService = new _ListCollaboratorsService.ListCollaboratorsService();
    const collaborators = await listCollaboratorsService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      all: all == "true"
    });
    return res.json(collaborators);
  }
}
exports.ListCollaboratorsController = ListCollaboratorsController;