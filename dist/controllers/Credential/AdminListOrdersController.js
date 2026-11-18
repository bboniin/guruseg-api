"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminListCredentialsController = void 0;
var _AdminListCredentialsService = require("../../services/Credential/AdminListCredentialsService");
class AdminListCredentialsController {
  async handle(req, res) {
    let {
      page,
      filter
    } = req.query;
    const adminListCredentialsService = new _AdminListCredentialsService.AdminListCredentialsService();
    const credentials = await adminListCredentialsService.execute({
      filter: filter ? String(filter) : "",
      page: Number(page) > 0 ? Number(page) : 0
    });
    return res.json(credentials);
  }
}
exports.AdminListCredentialsController = AdminListCredentialsController;