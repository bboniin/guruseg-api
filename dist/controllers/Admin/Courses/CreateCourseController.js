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
      restricted
    } = req.body;
    let photo = "";
    let userId = req.userId;

    if (req.file) {
      photo = req.file.filename;
    }

    const createCourseService = new _CreateCourseService.CreateCourseService();
    const course = await createCourseService.execute({
      userId,
      name,
      order,
      description,
      photo,
      restricted: restricted == "true" ? true : false
    });

    if (course["photo"]) {
      course["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + course["photo"];
    }

    return res.json(course);
  }

}

exports.CreateCourseController = CreateCourseController;