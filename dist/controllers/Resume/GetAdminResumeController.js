"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAdminResumeController = void 0;
var _GetAdminResumeService = require("../../services/Resume/GetAdminResumeService");
class GetAdminResumeController {
  async handle(req, res) {
    const {
      start_date,
      end_date
    } = req.body;
    const getAdminResumeService = new _GetAdminResumeService.GetAdminResumeService();
    const resume = await getAdminResumeService.execute({
      start_date,
      end_date
    });
    return res.json(resume);
  }
}
exports.GetAdminResumeController = GetAdminResumeController;