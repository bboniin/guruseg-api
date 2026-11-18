"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSSTDiagnosticsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListSSTDiagnosticsService {
  async execute({
    userId,
    search,
    page = 0,
    all
  }) {
    let filter = {
      user_id: userId
    };
    if (search) {
      filter.company_name = {
        contains: search,
        mode: "insensitive"
      };
    }
    const pageNumber = page !== undefined ? Number(page) : 0;
    const take = 30;
    const skip = !all ? pageNumber * take : undefined;
    const [diagnosticsRaw, total] = await Promise.all([_prisma.default.sSTDiagnostic.findMany({
      where: filter,
      orderBy: {
        create_at: "desc"
      },
      ...(!all && {
        skip,
        take
      })
    }), _prisma.default.sSTDiagnostic.count({
      where: filter
    })]);
    const diagnostics = diagnosticsRaw.map(item => {
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
    });
    return {
      diagnostics,
      total,
      page: pageNumber
    };
  }
}
exports.ListSSTDiagnosticsService = ListSSTDiagnosticsService;