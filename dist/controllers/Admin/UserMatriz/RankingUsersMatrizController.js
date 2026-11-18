"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankingUsersMatrizController = void 0;
var _RankingUsersMatrizService = require("../../../services/Admin/UserMatriz/RankingUsersMatrizService");
class RankingUsersMatrizController {
  async handle(req, res) {
    let userId = req.userId;
    const {
      date_start,
      date_end
    } = req.query;
    const rankingUsersMatrizService = new _RankingUsersMatrizService.RankingUsersMatrizService();
    const users = await rankingUsersMatrizService.execute({
      userId,
      date_start: date_start ? String(date_start) : "",
      date_end: date_end ? String(date_end) : ""
    });
    return res.json(users);
  }
}
exports.RankingUsersMatrizController = RankingUsersMatrizController;