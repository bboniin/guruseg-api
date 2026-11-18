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
      value_terceirize,
      commission,
      min_collaborators,
      max_collaborators,
      sector,
      required_company
    } = req.body;
    const createServiceService = new _CreateServiceService.CreateServiceService();
    const service = await createServiceService.execute({
      name,
      description,
      value,
      value_terceirize,
      min_collaborators,
      max_collaborators,
      commission,
      sector,
      required_company
    });
    return res.json(service);
  }
}
exports.CreateServiceController = CreateServiceController;