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
      restricted
    } = req.body;
    const {
      id
    } = req.params;
    let userId = req.userId;
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
      restricted: restricted == "true" ? true : false,
      userId
    });

    if (course["photo"]) {
      course["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + course["photo"];
    }

    return res.json(course);
  }

}

exports.EditCourseController = EditCourseController;