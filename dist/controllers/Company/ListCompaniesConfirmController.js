"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompaniesConfirmController = void 0;

var _ListCompaniesConfirmService = require("../../services/Company/ListCompaniesConfirmService");

class ListCompaniesConfirmController {
  async handle(req, res) {
    let userId = req.userId;
    const listCompaniesConfirmService = new _ListCompaniesConfirmService.ListCompaniesConfirmService();
    const companies = await listCompaniesConfirmService.execute({
      userId
    });
    return res.json(companies);
  }

}

exports.ListCompaniesConfirmController = ListCompaniesConfirmController;