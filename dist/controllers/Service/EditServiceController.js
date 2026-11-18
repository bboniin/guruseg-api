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
      value_terceirize,
      min_collaborators,
      max_collaborators,
      commission,
      sector,
      required_company
    } = req.body;
    const editServiceService = new _EditServiceService.EditServiceService();
    const service = await editServiceService.execute({
      name,
      id,
      description,
      min_collaborators,
      max_collaborators,
      value,
      value_terceirize,
      commission,
      sector,
      required_company
    });
    return res.json(service);
  }
}
exports.EditServiceController = EditServiceController;