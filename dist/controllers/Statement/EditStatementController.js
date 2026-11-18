"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditStatementController = void 0;
var _EditStatementService = require("../../services/Statement/EditStatementService");
class EditStatementController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      title,
      description
    } = req.body;
    const editStatementService = new _EditStatementService.EditStatementService();
    const statement = await editStatementService.execute({
      title,
      description,
      id
    });
    return res.json(statement);
  }
}
exports.EditStatementController = EditStatementController;