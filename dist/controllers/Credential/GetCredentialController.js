"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCredentialController = void 0;

var _GetCredentialService = require("../../services/Credential/GetCredentialService");

class GetCredentialController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getCredentialService = new _GetCredentialService.GetCredentialService();
    const credential = await getCredentialService.execute({
      id: id
    });

    if (credential) {
      if (credential["photo"]) {
        credential["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + credential["photo"];
      }
    }

    return res.json(credential);
  }

}

exports.GetCredentialController = GetCredentialController;