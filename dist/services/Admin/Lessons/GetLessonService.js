"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetLessonService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetLessonService {
  async execute({
    userId,
    id
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const lesson = await _prisma.default.lesson.findUnique({
      where: {
        id: id
      }
    });
    return lesson;
  }

}

exports.GetLessonService = GetLessonService;