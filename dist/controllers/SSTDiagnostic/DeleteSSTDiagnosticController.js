"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteSSTDiagnosticController = void 0;
var _DeleteSSTDiagnosticService = require("../../services/SSTDiagnostic/DeleteSSTDiagnosticService");
class DeleteSSTDiagnosticController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const userId = req.userId;
    const deleteService = new _DeleteSSTDiagnosticService.DeleteSSTDiagnosticService();
    const result = await deleteService.execute({
      id,
      userId
    });
    return res.json(result);
  }
}
exports.DeleteSSTDiagnosticController = DeleteSSTDiagnosticController;