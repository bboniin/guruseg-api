"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateServiceService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateServiceService {
  async execute({
    name,
    description,
    value,
    commission,
    sector
  }) {
    if (!name || !value || !commission || !sector) {
      throw new Error("Nome, valor, setor e comissão é obrigátorio");
    }

    const service = await _prisma.default.service.create({
      data: {
        name: name,
        value: Number(value),
        commission: Number(commission),
        visible: true,
        description: description,
        sector: sector
      }
    });
    return service;
  }

}

exports.CreateServiceService = CreateServiceService;