"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteEnterpriseAdminController = void 0;
var _DeleteEnterpriseAdminService = require("../../services/Enterprise/DeleteEnterpriseAdminService");
class DeleteEnterpriseAdminController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteEnterpriseAdminService = new _DeleteEnterpriseAdminService.DeleteEnterpriseAdminService();
    const enterprise = await deleteEnterpriseAdminService.execute({
      id: id
    });
    return res.json(enterprise);
  }
}
exports.DeleteEnterpriseAdminController = DeleteEnterpriseAdminController;