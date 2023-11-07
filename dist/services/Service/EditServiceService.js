"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditServiceService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditServiceService {
  async execute({
    name,
    id,
    description,
    value,
    commission,
    sector
  }) {
    if (!name || !value || !commission || !sector) {
      throw new Error("Nome, valor, setor e comissão é obrigátorio");
    }

    let data = {
      name: name,
      description: description,
      sector: sector,
      value: Number(value),
      commission: Number(commission)
    };
    const service = await _prisma.default.service.update({
      where: {
        id: id
      },
      data: data
    });
    return service;
  }

}

exports.EditServiceService = EditServiceService;