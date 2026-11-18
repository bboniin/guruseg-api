"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCollaboratorResumeController = void 0;
var _GetCollaboratorResumeService = require("../../services/Resume/GetCollaboratorResumeService");
class GetCollaboratorResumeController {
  async handle(req, res) {
    const {
      start_date,
      end_date
    } = req.body;
    let userId = req.userId;
    const getCollaboratorResumeService = new _GetCollaboratorResumeService.GetCollaboratorResumeService();
    const resume = await getCollaboratorResumeService.execute({
      start_date,
      end_date,
      userId
    });
    return res.json(resume);
  }
}
exports.GetCollaboratorResumeController = GetCollaboratorResumeController;