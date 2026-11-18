"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCoursesPublicService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListCoursesPublicService {
  async execute({
    userId,
    search
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    let filter = {};
    if (user.courses) {
      const idsArray = user.courses.split(";");
      filter = {
        id: {
          in: idsArray
        }
      };
    }
    const modules = await _prisma.default.module.findMany({
      where: filter,
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
                confirms: {
                  where: {
                    user_id: userId
                  }
                }
              }
            }
          }
        }
      }
    });
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
exports.ListCoursesPublicService = ListCoursesPublicService;