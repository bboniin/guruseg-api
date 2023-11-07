"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLessonsController = void 0;

var _ListLessonsService = require("../../../services/Admin/Lessons/ListLessonsService");

class ListLessonsController {
  async handle(req, res) {
    const {
      course_id
    } = req.params;
    let userId = req.userId;
    const listLessonsService = new _ListLessonsService.ListLessonsService();
    const lessons = await listLessonsService.execute({
      userId,
      course_id
    });
    lessons.map(item => {
      if (item["file"]) {
        item["file_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["file"];
      }
    });
    return res.json(lessons);
  }

}

exports.ListLessonsController = ListLessonsController;