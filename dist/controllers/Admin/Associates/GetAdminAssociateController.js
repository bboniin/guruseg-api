"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAdminAssociateController = void 0;
var _GetAdminAssociateService = require("../../../services/Admin/Associates/GetAdminAssociateService");
class GetAdminAssociateController {
  async handle(req, res) {
    let {
      id
    } = req.params;
    const getAdminAssociateService = new _GetAdminAssociateService.GetAdminAssociateService();
    const associate = await getAdminAssociateService.execute({
      id
    });
    return res.json(associate);
  }
}
exports.GetAdminAssociateController = GetAdminAssociateController;