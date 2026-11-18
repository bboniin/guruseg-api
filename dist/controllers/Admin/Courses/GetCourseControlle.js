"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCourseController = void 0;
var _GetCourseService = require("../../../services/Admin/Courses/GetCourseService");
class GetCourseController {
  async handle(req, res) {
    const {
      course_id
    } = req.params;
    const getCourseService = new _GetCourseService.GetCourseService();
    const course = await getCourseService.execute({
      course_id
    });
    return res.json(course);
  }
}
exports.GetCourseController = GetCourseController;