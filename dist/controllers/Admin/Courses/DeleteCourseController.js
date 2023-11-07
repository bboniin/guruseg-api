"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCourseController = void 0;

var _DeleteCourseService = require("../../../services/Admin/Courses/DeleteCourseService");

class DeleteCourseController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const deleteCourseService = new _DeleteCourseService.DeleteCourseService();
    const course = await deleteCourseService.execute({
      id,
      userId
    });
    return res.json(course);
  }

}

exports.DeleteCourseController = DeleteCourseController;