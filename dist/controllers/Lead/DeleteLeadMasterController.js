"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteLeadMasterController = void 0;
var _DeleteLeadMasterService = require("../../services/Lead/DeleteLeadMasterService");
class DeleteLeadMasterController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteLeadMasterService = new _DeleteLeadMasterService.DeleteLeadMasterService();
    const lead = await deleteLeadMasterService.execute({
      id
    });
    return res.json(lead);
  }
}
exports.DeleteLeadMasterController = DeleteLeadMasterController;