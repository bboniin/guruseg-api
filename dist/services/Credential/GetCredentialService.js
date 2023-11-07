"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCredentialService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetCredentialService {
  async execute({
    id
  }) {
    const credential = await _prisma.default.credential.findUnique({
      where: {
        id: id
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
        rg: true,
        cpf: true,
        birthday: true,
        description: true,
        photo: true,
        enabled: true,
        visible: true,
        id: true
      }
    });

    if (!credential) {
      throw new Error("Credenciado não foi encontrado");
    }

    return credential;
  }

}

exports.GetCredentialService = GetCredentialService;