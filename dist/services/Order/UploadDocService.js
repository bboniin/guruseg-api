"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDocService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateDocService {
  async execute({
    file,
    type,
    id
  }) {
    if (!file || !type || !id) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    const s3Storage = new _S3Storage.default();
    await s3Storage.saveFile(file);
    const Doc = await _prisma.default.doc.create({
      data: {
        type: type,
        order_id: id,
        file: file
      }
    });
    return Doc;
  }

}

exports.CreateDocService = CreateDocService;