"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDocOrderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateDocOrderService {
  async execute({
    id,
    type,
    file
  }) {
    if (!type || !id || !file) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    const s3Storage = new _S3Storage.default();
    await s3Storage.saveFile(file);
    const doc = await _prisma.default.doc.create({
      data: {
        order_id: id,
        type: type,
        file: file
      }
    });
    return doc;
  }
}
exports.CreateDocOrderService = CreateDocOrderService;