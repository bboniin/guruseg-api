"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetLeadMasterController = void 0;
var _GetLeadMasterService = require("../../services/Lead/GetLeadMasterService");
class GetLeadMasterController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getLeadMasterService = new _GetLeadMasterService.GetLeadMasterService();
    const lead = await getLeadMasterService.execute({
      id
    });
    return res.json(lead);
  }
}
exports.GetLeadMasterController = GetLeadMasterController;