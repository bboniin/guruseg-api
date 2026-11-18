"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCoursePublicController = void 0;
var _GetCoursePublicService = require("../../../services/Admin/Courses/GetCoursePublicService");
class GetCoursePublicController {
  async handle(req, res) {
    const {
      course_id
    } = req.params;
    let userId = req.userId;
    const getCoursePublicService = new _GetCoursePublicService.GetCoursePublicService();
    const course = await getCoursePublicService.execute({
      userId,
      course_id
    });
    return res.json(course);
  }
}
exports.GetCoursePublicController = GetCoursePublicController;