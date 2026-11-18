"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetStatementController = void 0;
var _GetStatementService = require("../../services/Statement/GetStatementService");
class GetStatementController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getStatementService = new _GetStatementService.GetStatementService();
    const statement = await getStatementService.execute({
      id
    });
    return res.json(statement);
  }
}
exports.GetStatementController = GetStatementController;