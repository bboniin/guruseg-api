"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListPreliminaryCompaniesController = void 0;
var _ListPreliminaryCompaniesService = require("../../services/PreliminaryCompany/ListPreliminaryCompaniesService");
class ListPreliminaryCompaniesController {
  async handle(req, res) {
    const {
      status,
      search,
      page
    } = req.query;
    const userId = req.userId;
    const listService = new _ListPreliminaryCompaniesService.ListPreliminaryCompaniesService();
    const companies = await listService.execute({
      userId,
      status: status ? String(status) : "",
      search: search ? String(search) : "",
      page: Number(page) || 0
    });
    return res.json(companies);
  }
}
exports.ListPreliminaryCompaniesController = ListPreliminaryCompaniesController;