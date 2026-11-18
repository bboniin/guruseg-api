"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResumeAssociateController = void 0;
var _ResumeAssociateService = require("../../services/Associate/ResumeAssociateService");
class ResumeAssociateController {
  async handle(req, res) {
    const userId = req.userId;
    const {
      startDate,
      endDate
    } = req.query;
    const resumeAssociateService = new _ResumeAssociateService.ResumeAssociateService();
    const resume = await resumeAssociateService.execute({
      userId,
      endDate: endDate ? String(endDate) : "",
      startDate: startDate ? String(startDate) : ""
    });
    return res.json(resume);
  }
}
exports.ResumeAssociateController = ResumeAssociateController;