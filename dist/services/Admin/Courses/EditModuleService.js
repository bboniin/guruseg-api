"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditModuleService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditModuleService {
  async execute({
    name,
    restricted,
    description,
    order,
    id
  }) {
    const module = await _prisma.default.module.findUnique({
      where: {
        id: id
      }
    });
    if (!name) {
      throw new Error("Nome do Modulo e descroção são obrigatórios");
    }
    if (!module) {
      throw new Error("Modulo não existe");
    }
    let orderC = parseInt(order);
    if (!orderC) {
      orderC = 0;
    }
    let data = {
      name: name,
      description: description,
      order: orderC,
      restricted: restricted
    };
    const moduleRes = await _prisma.default.module.update({
      where: {
        id: id
      },
      data: data
    });
    return moduleRes;
  }
}
exports.EditModuleService = EditModuleService;