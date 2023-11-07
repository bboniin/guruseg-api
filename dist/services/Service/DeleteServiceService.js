"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteServiceService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteServiceService {
  async execute({
    id
  }) {
    const service = await _prisma.default.service.update({
      where: {
        id: id
      },
      data: {
        visible: false
      }
    });
    return service;
  }

}

exports.DeleteServiceService = DeleteServiceService;