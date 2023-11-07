"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateServiceController = void 0;

var _CreateServiceService = require("../../services/Service/CreateServiceService");

class CreateServiceController {
  async handle(req, res) {
    const {
      name,
      description,
      value,
      commission,
      sector
    } = req.body;
    const createServiceService = new _CreateServiceService.CreateServiceService();
    const service = await createServiceService.execute({
      name,
      description,
      value,
      commission,
      sector
    });
    return res.json(service);
  }

}

exports.CreateServiceController = CreateServiceController;