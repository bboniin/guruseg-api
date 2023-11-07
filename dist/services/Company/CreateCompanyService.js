"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCompanyService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateCompanyService {
  async execute({
    observation,
    userId,
    razao_social
  }) {
    if (!razao_social || !userId) {
      throw new Error("Preencha o nome da empresa.");
    }

    const company = await _prisma.default.company.create({
      data: {
        observation: observation,
        collaborador_id: userId,
        razao_social: razao_social,
        status: "aguardando"
      }
    });
    return company;
  }

}

exports.CreateCompanyService = CreateCompanyService;