"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteManyLeadsMasterController = void 0;
var _DeleteManyLeadsMasterService = require("../../services/Lead/DeleteManyLeadsMasterService");
class DeleteManyLeadsMasterController {
  async handle(req, res) {
    const deleteManyLeadsMasterService = new _DeleteManyLeadsMasterService.DeleteManyLeadsMasterService();
    const lead = await deleteManyLeadsMasterService.execute();
    return res.json(lead);
  }
}
exports.DeleteManyLeadsMasterController = DeleteManyLeadsMasterController;