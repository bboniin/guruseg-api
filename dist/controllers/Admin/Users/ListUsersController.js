"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersController = void 0;

var _ListUsersService = require("../../../services/Admin/Users/ListUsersService");

class ListUsersController {
  async handle(req, res) {
    let userId = req.userId;
    const listUsersService = new _ListUsersService.ListUsersService();
    const users = await listUsersService.execute({
      userId
    });
    users.map(item => {
      if (item["photo"]) {
        item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });
    return res.json(users);
  }

}

exports.ListUsersController = ListUsersController;