"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCoursesService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListCoursesService {
  async execute({
    userId
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const courses = await _prisma.default.course.findMany({
      orderBy: {
        order: "asc"
      }
    });
    return courses;
  }

}

exports.ListCoursesService = ListCoursesService;