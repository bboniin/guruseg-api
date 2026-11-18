"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCoursesService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListCoursesService {
  async execute({
    search
  }) {
    const modules = await _prisma.default.module.findMany({
      orderBy: {
        order: "asc"
      },
      include: {
        courses: {
          where: {
            name: {
              contains: search,
              mode: "insensitive"
            }
          },
          orderBy: {
            order: "asc"
          },
          include: {
            lessons: {
              include: {
                confirms: true
              }
            }
          }
        }
      }
    });
    const courses = await _prisma.default.course.findMany({
      where: {
        module_id: null,
        name: {
          contains: search,
          mode: "insensitive"
        }
      },
      orderBy: {
        order: "asc"
      },
      include: {
        lessons: {
          include: {
            confirms: true
          }
        }
      }
    });
    if (courses.length) {
      modules.unshift({
        name: "Sem Modulo",
        id: "",
        description: "",
        order: 0,
        create_at: new Date(),
        update_at: new Date(),
        restricted: false,
        courses: courses
      });
    }
    const s3Storage = new _S3Storage.default();
    const modulesResponse = await Promise.all(modules.map(async module => {
      await Promise.all(module.courses.map(async course => {
        if (course.photo) {
          course["photo_url"] = await s3Storage.getTemporaryUrl(course.photo, 245);
        }
      }));
      return module;
    }));
    return modulesResponse;
  }
}
exports.ListCoursesService = ListCoursesService;