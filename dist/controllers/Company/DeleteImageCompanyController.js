"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteImageCompanyController = void 0;

var _DeleteImageCompanyService = require("../../services/Company/DeleteImageCompanyService");

class DeleteImageCompanyController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteImageCompanyService = new _DeleteImageCompanyService.DeleteImageCompanyService();
    const image = await deleteImageCompanyService.execute({
      id
    });
    return res.json(image);
  }

}

exports.DeleteImageCompanyController = DeleteImageCompanyController;