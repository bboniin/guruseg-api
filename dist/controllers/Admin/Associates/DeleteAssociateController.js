"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAssociateController = void 0;
var _DeleteAssociateService = require("../../../services/Admin/Associates/DeleteAssociateService");
class DeleteAssociateController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteAssociateService = new _DeleteAssociateService.DeleteAssociateService();
    const associate = await deleteAssociateService.execute({
      id
    });
    return res.json(associate);
  }
}
exports.DeleteAssociateController = DeleteAssociateController;