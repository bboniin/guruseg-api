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
    let userId = req.userId;
    const getCourseService = new _GetCourseService.GetCourseService();
    const course = await getCourseService.execute({
      userId,
      course_id
    });
    course.lessons.map(item => {
      if (item["file"]) {
        item["file_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["file"];
      }
    });
    return res.json(course);
  }

}

exports.GetCourseController = GetCourseController;