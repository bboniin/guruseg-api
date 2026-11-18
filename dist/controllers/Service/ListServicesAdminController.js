"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServicesAdminController = void 0;
var _ListServicesAdminService = require("../../services/Service/ListServicesAdminService");
class ListServicesAdminController {
  async handle(req, res) {
    let {
      page,
      search,
      all
    } = req.query;
    const listServicesAdminService = new _ListServicesAdminService.ListServicesAdminService();
    const services = await listServicesAdminService.execute({
      search: search ? String(search) : "",
      page: Number(page) > 0 ? Number(page) : 0,
      all: all == "true"
    });
    return res.json(services);
  }
}
exports.ListServicesAdminController = ListServicesAdminController;