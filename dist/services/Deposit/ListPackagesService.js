"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListPackagesService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListPackagesService {
  async execute() {
    const packages = await _prisma.default.depositPackage.findMany({
      orderBy: {
        value: "desc"
      }
    });
    return packages;
  }
}
exports.ListPackagesService = ListPackagesService;