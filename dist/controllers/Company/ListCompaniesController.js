"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompaniesController = void 0;
var _ListCompaniesService = require("../../services/Company/ListCompaniesService");
class ListCompaniesController {
  async handle(req, res) {
    const {
      status,
      search,
      page
    } = req.query;
    let userId = req.userId;
    const listCompaniesService = new _ListCompaniesService.ListCompaniesService();
    const companies = await listCompaniesService.execute({
      userId,
      status: status ? String(status) : "",
      search: search ? String(search) : "",
      page: Number(page) || 0
    });
    return res.json(companies);
  }
}
exports.ListCompaniesController = ListCompaniesController;