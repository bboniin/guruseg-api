"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSSTDiagnosticsController = void 0;
var _ListSSTDiagnosticsService = require("../../services/SSTDiagnostic/ListSSTDiagnosticsService");
class ListSSTDiagnosticsController {
  async handle(req, res) {
    const {
      search,
      page,
      all
    } = req.query;
    const userId = req.userId;
    const listService = new _ListSSTDiagnosticsService.ListSSTDiagnosticsService();
    const result = await listService.execute({
      userId,
      search: search ? String(search) : undefined,
      page: page !== undefined ? Number(page) : 0,
      all: String(all) === "true"
    });
    return res.json(result);
  }
}
exports.ListSSTDiagnosticsController = ListSSTDiagnosticsController;