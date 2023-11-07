"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCoursesPublicController = void 0;

var _ListCoursesPublicService = require("../../../services/Admin/Courses/ListCoursesPublicService");

class ListCoursesPublicController {
  async handle(req, res) {
    let userId = req.userId;
    const listCoursesPublicService = new _ListCoursesPublicService.ListCoursesPublicService();
    const coursesPublic = await listCoursesPublicService.execute({
      userId
    });
    coursesPublic.map(item => {
      if (item["photo"]) {
        item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });
    return res.json(coursesPublic);
  }

}

exports.ListCoursesPublicController = ListCoursesPublicController;