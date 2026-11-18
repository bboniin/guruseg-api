"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteStatementController = void 0;
var _DeleteStatementService = require("../../services/Statement/DeleteStatementService");
class DeleteStatementController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteStatementService = new _DeleteStatementService.DeleteStatementService();
    const statement = await deleteStatementService.execute({
      id
    });
    return res.json(statement);
  }
}
exports.DeleteStatementController = DeleteStatementController;