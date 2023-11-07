"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminListCredentialsController = void 0;

var _AdminListCredentialsService = require("../../services/Credential/AdminListCredentialsService");

class AdminListCredentialsController {
  async handle(req, res) {
    const adminListCredentialsService = new _AdminListCredentialsService.AdminListCredentialsService();
    const credentials = await adminListCredentialsService.execute({});
    credentials.map(item => {
      if (item["photo"]) {
        item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });
    return res.json(credentials);
  }

}

exports.AdminListCredentialsController = AdminListCredentialsController;