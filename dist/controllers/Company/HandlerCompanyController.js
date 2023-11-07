"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandlerCompanyController = void 0;

var _HandlerCompanyService = require("../../services/Company/HandlerCompanyService");

class HandlerCompanyController {
  async handle(req, res) {
    const {
      company_id
    } = req.params;
    const {
      observation
    } = req.body;
    let userId = req.userId;
    const handlerCompanyService = new _HandlerCompanyService.HandlerCompanyService();
    const services = await handlerCompanyService.execute({
      userId,
      company_id,
      observation
    });
    return res.json(services);
  }

}

exports.HandlerCompanyController = HandlerCompanyController;