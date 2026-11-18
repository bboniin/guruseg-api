"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserResumeController = void 0;
var _GetUserResumeService = require("../../services/Resume/GetUserResumeService");
class GetUserResumeController {
  async handle(req, res) {
    const {
      start_date,
      end_date
    } = req.body;
    let userId = req.userId;
    const getUserResumeService = new _GetUserResumeService.GetUserResumeService();
    const resume = await getUserResumeService.execute({
      start_date,
      end_date,
      userId
    });
    return res.json(resume);
  }
}
exports.GetUserResumeController = GetUserResumeController;