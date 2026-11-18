"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListStatementsController = void 0;
var _ListStatementsService = require("../../services/Statement/ListStatementsService");
class ListStatementsController {
  async handle(req, res) {
    const {
      page
    } = req.query;
    const listStatementsService = new _ListStatementsService.ListStatementsService();
    const statements = await listStatementsService.execute({
      page: Number(page) || 0
    });
    return res.json(statements);
  }
}
exports.ListStatementsController = ListStatementsController;