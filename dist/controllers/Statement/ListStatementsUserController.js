"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListStatementsUserController = void 0;
var _ListStatementsUserService = require("../../services/Statement/ListStatementsUserService");
class ListStatementsUserController {
  async handle(req, res) {
    let userId = req.userId;
    const listStatementsUserService = new _ListStatementsUserService.ListStatementsUserService();
    const statements = await listStatementsUserService.execute({
      userId: userId
    });
    return res.json(statements);
  }
}
exports.ListStatementsUserController = ListStatementsUserController;