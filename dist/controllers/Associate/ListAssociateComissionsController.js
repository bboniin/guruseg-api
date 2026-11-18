"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAssociateComissionsController = void 0;
var _ListAssociateComissionsService = require("../../services/Associate/ListAssociateComissionsService");
class ListAssociateComissionsController {
  async handle(req, res) {
    const {
      page
    } = req.query;
    const userId = req.userId;
    const listAssociateComissionsService = new _ListAssociateComissionsService.ListAssociateComissionsService();
    const comissions = await listAssociateComissionsService.execute({
      userId,
      page: Number(page) || 0
    });
    return res.json(comissions);
  }
}
exports.ListAssociateComissionsController = ListAssociateComissionsController;