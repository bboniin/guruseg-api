"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCourseController = void 0;
var _EditCourseService = require("../../../services/Admin/Courses/EditCourseService");
class EditCourseController {
  async handle(req, res) {
    const {
      name,
      description,
      order,
      module_id
    } = req.body;
    const {
      id
    } = req.params;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    const editCourseService = new _EditCourseService.EditCourseService();
    const course = await editCourseService.execute({
      name,
      description,
      order,
      photo,
      id,
      module_id
    });
    return res.json(course);
  }
}
exports.EditCourseController = EditCourseController;