"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersMatrizController = void 0;
var _ListUsersMatrizService = require("../../../services/Admin/UserMatriz/ListUsersMatrizService");
class ListUsersMatrizController {
  async handle(req, res) {
    let userId = req.userId;
    const {
      filter,
      page,
      all,
      type
    } = req.query;
    const listUsersMatrizService = new _ListUsersMatrizService.ListUsersMatrizService();
    const users = await listUsersMatrizService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      type: type ? String(type) : "",
      all: all == "true"
    });
    return res.json(users);
  }
}
exports.ListUsersMatrizController = ListUsersMatrizController;