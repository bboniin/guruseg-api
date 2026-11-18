"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCourseController = void 0;
var _CreateCourseService = require("../../../services/Admin/Courses/CreateCourseService");
class CreateCourseController {
  async handle(req, res) {
    const {
      name,
      description,
      order,
      restricted,
      module_id
    } = req.body;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    const createCourseService = new _CreateCourseService.CreateCourseService();
    const course = await createCourseService.execute({
      name,
      order,
      description,
      photo,
      module_id
    });
    return res.json(course);
  }
}
exports.CreateCourseController = CreateCourseController;