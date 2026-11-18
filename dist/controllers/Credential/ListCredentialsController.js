"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCredentialsController = void 0;
var _ListCredentialsService = require("../../services/Credential/ListCredentialsService");
class ListCredentialsController {
  async handle(req, res) {
    let {
      page,
      state,
      city,
      service
    } = req.query;
    const listCredentialsService = new _ListCredentialsService.ListCredentialsService();
    const credentials = await listCredentialsService.execute({
      state: state ? String(state) : "",
      city: city ? String(city) : "",
      service: service ? String(service) : "",
      page: Number(page) > 0 ? Number(page) : 0
    });
    return res.json(credentials);
  }
}
exports.ListCredentialsController = ListCredentialsController;