"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServicesController = void 0;

var _ListServicesService = require("../../services/Service/ListServicesService");

class ListServicesController {
  async handle(req, res) {
    let userId = req.userId;
    const listServicesService = new _ListServicesService.ListServicesService();
    const services = await listServicesService.execute({
      userId
    });
    return res.json(services);
  }

}

exports.ListServicesController = ListServicesController;