"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersController = void 0;
var _ListUsersService = require("../../../services/Admin/Users/ListUsersService");
class ListUsersController {
  async handle(req, res) {
    let userId = req.userId;
    const {
      filter,
      page,
      all,
      type
    } = req.query;
    const listUsersService = new _ListUsersService.ListUsersService();
    const users = await listUsersService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      type: type ? String(type) : "",
      all: all == "true"
    });
    return res.json(users);
  }
}
exports.ListUsersController = ListUsersController;