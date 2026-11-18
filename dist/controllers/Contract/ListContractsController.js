"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListContractsController = void 0;
var _ListContractsService = require("../../services/Contract/ListContractsService");
class ListContractsController {
  async handle(req, res) {
    const {
      lead_id,
      search,
      status,
      page
    } = req.query;
    let userId = req.userId;
    const listContractsService = new _ListContractsService.ListContractsService();
    const contracts = await listContractsService.execute({
      userId,
      lead_id: lead_id ? String(lead_id) : "",
      search: search ? String(search) : "",
      status: status ? String(status) : "",
      page: Number(page) || 0
    });
    return res.json(contracts);
  }
}
exports.ListContractsController = ListContractsController;