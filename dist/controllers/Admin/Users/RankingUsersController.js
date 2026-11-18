"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankingUsersController = void 0;
var _RankingUsersService = require("../../../services/Admin/Users/RankingUsersService");
class RankingUsersController {
  async handle(req, res) {
    let userId = req.userId;
    const {
      date_start,
      date_end
    } = req.query;
    const rankingUsersService = new _RankingUsersService.RankingUsersService();
    const users = await rankingUsersService.execute({
      userId,
      date_start: date_start ? String(date_start) : "",
      date_end: date_end ? String(date_end) : ""
    });
    return res.json(users);
  }
}
exports.RankingUsersController = RankingUsersController;