"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResumeAdminAssociateController = void 0;
var _ResumeAdminAssociateService = require("../../../services/Admin/Associates/ResumeAdminAssociateService");
class ResumeAdminAssociateController {
  async handle(req, res) {
    const {
      associate_id
    } = req.params;
    const {
      startDate,
      endDate
    } = req.query;
    const resumeAdminAssociateService = new _ResumeAdminAssociateService.ResumeAdminAssociateService();
    const resume = await resumeAdminAssociateService.execute({
      associate_id,
      endDate: endDate ? String(endDate) : "",
      startDate: startDate ? String(startDate) : ""
    });
    return res.json(resume);
  }
}
exports.ResumeAdminAssociateController = ResumeAdminAssociateController;