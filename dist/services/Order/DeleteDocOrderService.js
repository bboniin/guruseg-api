"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteDocOrderService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteDocOrderService {
  async execute({
    type,
    id
  }) {
    if (!type || !id) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    const docFile = await _prisma.default.doc.findFirst({
      where: {
        id: id,
        type: type
      }
    });
    const s3Storage = new _S3Storage.default();
    await s3Storage.deleteFile(docFile["file"]);
    const doc = await _prisma.default.doc.delete({
      where: {
        id: id
      }
    });
    return doc;
  }

}

exports.DeleteDocOrderService = DeleteDocOrderService;