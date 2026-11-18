"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersMatrizService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListUsersMatrizService {
  async execute({
    userId,
    type,
    page,
    filter,
    all
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });
    if (!admin && !all) {
      throw new Error("Rota restrita ao administrador");
    }
    let filterSearch = {};
    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive"
      };
    }
    if (type) {
      filterSearch["category"] = type;
    }
    if (all) {
      const users = await _prisma.default.user.findMany({
        where: {
          visible: true,
          type: "matriz",
          category: {
            contains: type
          },
          ...filterSearch
        },
        orderBy: {
          create_at: "asc"
        }
      });
      return {
        users
      };
    }
    const usersTotal = await _prisma.default.user.count({
      where: {
        visible: true,
        type: "matriz",
        ...filterSearch
      }
    });
    const users = await _prisma.default.user.findMany({
      where: {
        visible: true,
        type: "matriz",
        ...filterSearch
      },
      orderBy: {
        create_at: "asc"
      },
      skip: page * 30,
      take: 30
    });
    const s3Storage = new _S3Storage.default();
    const usersResponse = await Promise.all(users.map(async user => {
      if (user.photo) {
        user["photo_url"] = await s3Storage.getTemporaryUrl(user.photo, 245);
      }
      return user;
    }));
    return {
      users: usersResponse,
      usersTotal
    };
  }
}
exports.ListUsersMatrizService = ListUsersMatrizService;