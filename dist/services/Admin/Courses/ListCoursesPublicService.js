"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCoursesPublicService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListCoursesPublicService {
  async execute({
    userId
  }) {
    let courses = await _prisma.default.course.findMany({
      select: {
        name: true,
        photo: true,
        description: true,
        lessons: true,
        restricted: true,
        id: true
      },
      orderBy: {
        order: "asc"
      }
    });
    return courses;
  }

}

exports.ListCoursesPublicService = ListCoursesPublicService;