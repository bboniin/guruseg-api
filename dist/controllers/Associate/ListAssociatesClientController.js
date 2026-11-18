"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAssociatesClientController = void 0;
var _ListAssociatesClientService = require("../../services/Associate/ListAssociatesClientService");
class ListAssociatesClientController {
  async handle(req, res) {
    const userId = req.userId;
    const listAssociatesClientService = new _ListAssociatesClientService.ListAssociatesClientService();
    const associates = await listAssociatesClientService.execute({
      userId
    });
    return res.json(associates);
  }
}
exports.ListAssociatesClientController = ListAssociatesClientController;