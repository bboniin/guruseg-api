"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDocOrderService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateDocOrderService {
  async execute({
    id,
    type,
    file
  }) {
    if (!type || !id || !file) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    const s3Storage = new _S3Storage.default();
    await s3Storage.saveFile(file);
    const order = await _prisma.default.doc.create({
      data: {
        order_id: id,
        type: type,
        file: file
      }
    });
    return order;
  }

}

exports.CreateDocOrderService = CreateDocOrderService;