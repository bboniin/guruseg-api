"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteLeadController = void 0;
var _DeleteLeadService = require("../../services/Lead/DeleteLeadService");
class DeleteLeadController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteLeadService = new _DeleteLeadService.DeleteLeadService();
    const lead = await deleteLeadService.execute({
      id
    });
    return res.json(lead);
  }
}
exports.DeleteLeadController = DeleteLeadController;