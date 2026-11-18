"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LastStatementsUserController = void 0;
var _LastStatementsUserService = require("../../services/Statement/LastStatementsUserService");
class LastStatementsUserController {
  async handle(req, res) {
    let userId = req.userId;
    const lastStatementsUserService = new _LastStatementsUserService.LastStatementsUserService();
    const statements = await lastStatementsUserService.execute({
      userId: userId
    });
    return res.json(statements);
  }
}
exports.LastStatementsUserController = LastStatementsUserController;