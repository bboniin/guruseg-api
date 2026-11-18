"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCoursesPublicController = void 0;
var _ListCoursesPublicService = require("../../../services/Admin/Courses/ListCoursesPublicService");
class ListCoursesPublicController {
  async handle(req, res) {
    let userId = req.userId;
    const {
      search
    } = req.query;
    const listCoursesPublicService = new _ListCoursesPublicService.ListCoursesPublicService();
    const modules = await listCoursesPublicService.execute({
      userId,
      search: search ? String(search) : ""
    });
    return res.json(modules);
  }
}
exports.ListCoursesPublicController = ListCoursesPublicController;