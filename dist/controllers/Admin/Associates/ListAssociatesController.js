"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAssociatesController = void 0;
var _ListAssociatesService = require("../../../services/Admin/Associates/ListAssociatesService");
class ListAssociatesController {
  async handle(req, res) {
    const {
      filter,
      page,
      all
    } = req.query;
    const listAssociatesService = new _ListAssociatesService.ListAssociatesService();
    const associates = await listAssociatesService.execute({
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      all: all == "true"
    });
    return res.json(associates);
  }
}
exports.ListAssociatesController = ListAssociatesController;