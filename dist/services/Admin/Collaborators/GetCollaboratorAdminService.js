"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCollaboratorAdminService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetCollaboratorAdminService {
  async execute({
    id
  }) {
    const collaborator = await _prisma.default.collaborator.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        email: true,
        sector: true
      }
    });

    if (!collaborator) {
      throw new Error("Técnico não foi encontrado.");
    }

    return collaborator;
  }

}

exports.GetCollaboratorAdminService = GetCollaboratorAdminService;