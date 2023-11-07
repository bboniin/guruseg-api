"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteServiceController = void 0;

var _DeleteServiceService = require("../../services/Service/DeleteServiceService");

class DeleteServiceController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteServiceService = new _DeleteServiceService.DeleteServiceService();
    const service = await deleteServiceService.execute({
      id
    });
    return res.json(service);
  }

}

exports.DeleteServiceController = DeleteServiceController;