"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLeadsBuyController = void 0;
var _ListLeadsBuyService = require("../../services/Lead/ListLeadsBuyService");
class ListLeadsBuyController {
  async handle(req, res) {
    const {
      page,
      location
    } = req.query;
    const listLeadsBuyService = new _ListLeadsBuyService.ListLeadsBuyService();
    const userId = req.userId;
    const leads = await listLeadsBuyService.execute({
      page: Number(page) || 0,
      userId: userId ? String(userId) : "",
      location: location ? String(location) : ""
    });
    return res.json(leads);
  }
}
exports.ListLeadsBuyController = ListLeadsBuyController;