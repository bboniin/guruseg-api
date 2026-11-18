"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateModuleService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateModuleService {
  async execute({
    name,
    restricted,
    order,
    description
  }) {
    if (!name || !description) {
      throw new Error("Nome do Modulo e descroção são obrigatórios");
    }
    let orderC = parseInt(order);
    if (!orderC) {
      orderC = 0;
    }
    const moduleRes = await _prisma.default.module.create({
      data: {
        name: name,
        description: description,
        order: orderC,
        restricted: restricted
      }
    });
    return moduleRes;
  }
}
exports.CreateModuleService = CreateModuleService;