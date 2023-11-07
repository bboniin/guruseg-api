"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCredentialsController = void 0;

var _ListCredentialsService = require("../../services/Credential/ListCredentialsService");

class ListCredentialsController {
  async handle(req, res) {
    const listCredentialsService = new _ListCredentialsService.ListCredentialsService();
    const credentials = await listCredentialsService.execute();
    credentials.map(item => {
      if (item["photo"]) {
        item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });
    return res.json(credentials);
  }

}

exports.ListCredentialsController = ListCredentialsController;