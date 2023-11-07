"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersCollaboratorService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return users;
  }

}

exports.ListUsersCollaboratorService = ListUsersCollaboratorService;