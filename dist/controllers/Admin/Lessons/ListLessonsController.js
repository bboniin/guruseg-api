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
    const listLessonsService = new _ListLessonsService.ListLessonsService();
    const lessons = await listLessonsService.execute({
      course_id
    });
    return res.json(lessons);
  }
}
exports.ListLessonsController = ListLessonsController;