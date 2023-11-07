"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCredentialController = void 0;

var _DeleteCredentialService = require("../../services/Credential/DeleteCredentialService");

class DeleteCredentialController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteCredentialService = new _DeleteCredentialService.DeleteCredentialService();
    const service = await deleteCredentialService.execute({
      id
    });
    return res.json(service);
  }

}

exports.DeleteCredentialController = DeleteCredentialController;