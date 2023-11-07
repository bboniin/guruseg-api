"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCoursePublicService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetCoursePublicService {
  async execute({
    userId,
    course_id
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    const course = await _prisma.default.course.findUnique({
      where: {
        id: course_id
      },
      include: {
        lessons: true
      }
    });

    if (user.course_restricted) {
      if (!course.restricted) {
        throw new Error("Você não tem acesso a esse curso");
      }
    }

    return course;
  }

}

exports.GetCoursePublicService = GetCoursePublicService;