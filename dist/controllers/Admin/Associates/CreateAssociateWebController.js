"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAssociateWebController = void 0;
var _CreateAssociateWebService = require("../../../services/Admin/Associates/CreateAssociateWebService");
class CreateAssociateWebController {
  async handle(req, res) {
    const {
      name,
      email,
      phone_number,
      accounting_name,
      city,
      state
    } = req.body;
    const createAssociateWebService = new _CreateAssociateWebService.CreateAssociateWebService();
    const associate = await createAssociateWebService.execute({
      name,
      email,
      phone_number,
      accounting_name,
      city,
      state
    });
    return res.json(associate);
  }
}
exports.CreateAssociateWebController = CreateAssociateWebController;