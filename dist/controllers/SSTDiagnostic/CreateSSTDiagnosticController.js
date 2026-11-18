"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSSTDiagnosticController = void 0;
var _CreateSSTDiagnosticService = require("../../services/SSTDiagnostic/CreateSSTDiagnosticService");
class CreateSSTDiagnosticController {
  async handle(req, res) {
    const {
      company_name,
      employees_count,
      assessment_date,
      franchisee_name,
      franchisee_phone,
      franchisee_email,
      answers,
      stats
    } = req.body;
    const userId = req.userId;
    const createService = new _CreateSSTDiagnosticService.CreateSSTDiagnosticService();
    const result = await createService.execute({
      userId,
      company_name,
      employees_count,
      assessment_date,
      franchisee_name,
      franchisee_phone,
      franchisee_email,
      answers,
      stats
    });
    return res.status(201).json(result);
  }
}
exports.CreateSSTDiagnosticController = CreateSSTDiagnosticController;