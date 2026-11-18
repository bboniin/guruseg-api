"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEsocialController = void 0;
var _ListEsocialService = require("../../services/Enterprise/ListEsocialService");
class ListEsocialController {
  async handle(req, res) {
    const userId = req.userId;
    const listEsocialService = new _ListEsocialService.ListEsocialService();
    const enterprises = await listEsocialService.execute({
      userId
    });
    return res.json(enterprises);
  }
}
exports.ListEsocialController = ListEsocialController;