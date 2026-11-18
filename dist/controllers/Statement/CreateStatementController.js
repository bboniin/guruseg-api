"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateStatementController = void 0;
var _CreateStatementService = require("../../services/Statement/CreateStatementService");
class CreateStatementController {
  async handle(req, res) {
    const {
      title,
      description
    } = req.body;
    const createStatementService = new _CreateStatementService.CreateStatementService();
    const statement = await createStatementService.execute({
      title,
      description
    });
    return res.json(statement);
  }
}
exports.CreateStatementController = CreateStatementController;