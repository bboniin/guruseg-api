"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteModuleService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteModuleService {
  async execute({
    id
  }) {
    const module = await _prisma.default.module.delete({
      where: {
        id: id
      }
    });
    return module;
  }
}
exports.DeleteModuleService = DeleteModuleService;