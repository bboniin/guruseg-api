"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditServiceController = void 0;

var _EditServiceService = require("../../services/Service/EditServiceService");

class EditServiceController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      description,
      value,
      commission,
      sector
    } = req.body;
    const editServiceService = new _EditServiceService.EditServiceService();
    const service = await editServiceService.execute({
      name,
      id,
      description,
      value,
      commission,
      sector
    });
    return res.json(service);
  }

}

exports.EditServiceController = EditServiceController;