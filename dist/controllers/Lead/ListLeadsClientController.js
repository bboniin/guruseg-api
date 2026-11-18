"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLeadsClientController = void 0;
var _ListLeadsClientService = require("../../services/Lead/ListLeadsClientService");
class ListLeadsClientController {
  async handle(req, res) {
    let userId = req.userId;
    const listLeadsClientService = new _ListLeadsClientService.ListLeadsClientService();
    const leads = await listLeadsClientService.execute({
      userId
    });
    return res.json(leads);
  }
}
exports.ListLeadsClientController = ListLeadsClientController;