"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLessonsService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListLessonsService {
  async execute({
    userId,
    course_id
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const lessons = await _prisma.default.lesson.findMany({
      where: {
        course_id: course_id
      },
      orderBy: {
        order: "asc"
      }
    });
    return lessons;
  }

}

exports.ListLessonsService = ListLessonsService;