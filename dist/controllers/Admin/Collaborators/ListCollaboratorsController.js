"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCollaboratorsController = void 0;

var _ListCollaboratorsService = require("../../../services/Admin/Collaborators/ListCollaboratorsService");

class ListCollaboratorsController {
  async handle(req, res) {
    let userId = req.userId;
    const listCollaboratorsService = new _ListCollaboratorsService.ListCollaboratorsService();
    const collaborators = await listCollaboratorsService.execute({
      userId
    });
    collaborators.map(item => {
      if (item["photo"]) {
        item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });
    return res.json(collaborators);
  }

}

exports.ListCollaboratorsController = ListCollaboratorsController;