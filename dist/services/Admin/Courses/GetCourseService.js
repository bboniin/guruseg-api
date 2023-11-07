"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCourseService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetCourseService {
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

    const course = await _prisma.default.course.findUnique({
      where: {
        id: course_id
      },
      include: {
        lessons: true
      }
    });
    return course;
  }

}

exports.GetCourseService = GetCourseService;