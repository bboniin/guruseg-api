"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSSTDiagnosticService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetSSTDiagnosticService {
  async execute({
    id,
    userId
  }) {
    if (!id) {
      throw new Error("ID do diagnóstico é obrigatório");
    }
    const filter = {
      id
    };
    if (userId) {
      // If userId is provided, we can either restrict or allow
      filter.user_id = userId;
    }
    const item = await _prisma.default.sSTDiagnostic.findFirst({
      where: filter,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true
          }
        }
      }
    });
    if (!item) {
      throw new Error("Diagnóstico não encontrado");
    }
    let parsedAnswers = {};
    let parsedStats = {};
    try {
      if (item.answers) {
        parsedAnswers = typeof item.answers === "string" ? JSON.parse(item.answers) : item.answers;
      }
    } catch (e) {
      parsedAnswers = {};
    }
    try {
      if (item.stats) {
        parsedStats = typeof item.stats === "string" ? JSON.parse(item.stats) : item.stats;
      }
    } catch (e) {
      parsedStats = {};
    }
    return {
      ...item,
      answers: parsedAnswers,
      stats: parsedStats
    };
  }
}
exports.GetSSTDiagnosticService = GetSSTDiagnosticService;