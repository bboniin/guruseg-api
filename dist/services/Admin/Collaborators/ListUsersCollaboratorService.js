"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersCollaboratorService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListUsersCollaboratorService {
  async execute({
    userId,
    collaborator_id
  }) {
    const users = await _prisma.default.user.findMany({
      where: {
        OR: [{
          sector1_id: collaborator_id
        }, {
          sector2_id: collaborator_id
        }, {
          sector3_id: collaborator_id
        }, {
          sector4_id: collaborator_id
        }, {
          sector5_id: collaborator_id
        }],
        visible: true
      },
      orderBy: {
        create_at: "asc"
      }
    });
    const s3Storage = new _S3Storage.default();
    const usersResponse = await Promise.all(users.map(async user => {
      if (user.photo) {
        user["photo_url"] = await s3Storage.getTemporaryUrl(user.photo, 245);
      }
      return user;
    }));
    return usersResponse;
  }
}
exports.ListUsersCollaboratorService = ListUsersCollaboratorService;