"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEsocialAdminController = void 0;
var _ListEsocialAdminService = require("../../services/Enterprise/ListEsocialAdminService");
class ListEsocialAdminController {
  async handle(req, res) {
    const {
      user_id
    } = req.query;
    const listEsocialAdminService = new _ListEsocialAdminService.ListEsocialAdminService();
    const enterprises = await listEsocialAdminService.execute({
      userId: user_id ? String(user_id) : undefined
    });
    return res.json(enterprises);
  }
}
exports.ListEsocialAdminController = ListEsocialAdminController;