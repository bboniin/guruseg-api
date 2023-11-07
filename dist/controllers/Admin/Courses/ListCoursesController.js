"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCoursesController = void 0;

var _ListCoursesService = require("../../../services/Admin/Courses/ListCoursesService");

class ListCoursesController {
  async handle(req, res) {
    let userId = req.userId;
    const listCoursesService = new _ListCoursesService.ListCoursesService();
    const courses = await listCoursesService.execute({
      userId
    });
    courses.map(item => {
      if (item["photo"]) {
        item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });
    return res.json(courses);
  }

}

exports.ListCoursesController = ListCoursesController;