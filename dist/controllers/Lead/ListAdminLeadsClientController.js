"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminLeadsClientController = void 0;
var _ListLeadsClientService = require("../../services/Lead/ListLeadsClientService");
class ListAdminLeadsClientController {
  async handle(req, res) {
    let {
      userId
    } = req.params;
    const listLeadsClientService = new _ListLeadsClientService.ListLeadsClientService();
    const leads = await listLeadsClientService.execute({
      userId
    });
    return res.json(leads);
  }
}
exports.ListAdminLeadsClientController = ListAdminLeadsClientController;