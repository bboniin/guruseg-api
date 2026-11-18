"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCredentialService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteCredentialService {
  async execute({
    id
  }) {
    const credential = await _prisma.default.credential.delete({
      where: {
        id: id
      }
    });
    return credential;
  }
}
exports.DeleteCredentialService = DeleteCredentialService;