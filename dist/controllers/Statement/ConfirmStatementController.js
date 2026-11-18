"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmStatementController = void 0;
var _ConfirmStatementService = require("../../services/Statement/ConfirmStatementService");
class ConfirmStatementController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const userId = req.userId;
    const confirmStatementService = new _ConfirmStatementService.ConfirmStatementService();
    const statement = await confirmStatementService.execute({
      userId: userId,
      id: id
    });
    return res.json(statement);
  }
}
exports.ConfirmStatementController = ConfirmStatementController;