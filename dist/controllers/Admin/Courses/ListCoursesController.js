"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCoursesController = void 0;
var _ListCoursesService = require("../../../services/Admin/Courses/ListCoursesService");
class ListCoursesController {
  async handle(req, res) {
    const {
      search
    } = req.query;
    const listCoursesService = new _ListCoursesService.ListCoursesService();
    const modules = await listCoursesService.execute({
      search: search ? String(search) : ""
    });
    return res.json(modules);
  }
}
exports.ListCoursesController = ListCoursesController;