"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCredentialsService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListCredentialsService {
  async execute() {
    const credentials = await _prisma.default.credential.findMany({
      where: {
        enabled: true,
        visible: true
      },
      orderBy: {
        update_at: "desc"
      },
      select: {
        email: true,
        name: true,
        phone_number: true,
        state: true,
        city: true,
        services: true,
        served_cities: true,
        profession: true,
        description: true,
        photo: true,
        enabled: true,
        visible: true,
        id: true
      }
    });
    return credentials;
  }

}

exports.ListCredentialsService = ListCredentialsService;