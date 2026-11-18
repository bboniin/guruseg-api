"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServicesClientController = void 0;
var _ListServicesClientService = require("../../services/Service/ListServicesClientService");
class ListServicesClientController {
  async handle(req, res) {
    let userId = req.userId;
    const listServicesClientService = new _ListServicesClientService.ListServicesClientService();
    const services = await listServicesClientService.execute({
      userId
    });
    return res.json(services);
  }
}
exports.ListServicesClientController = ListServicesClientController;