"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteEnterpriseTecnicoController = void 0;
var _DeleteEnterpriseTecnicoService = require("../../services/Enterprise/DeleteEnterpriseTecnicoService");
class DeleteEnterpriseTecnicoController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const userId = req.userId;
    const deleteEnterpriseTecnicoService = new _DeleteEnterpriseTecnicoService.DeleteEnterpriseTecnicoService();
    const enterprise = await deleteEnterpriseTecnicoService.execute({
      id,
      userId
    });
    return res.json(enterprise);
  }
}
exports.DeleteEnterpriseTecnicoController = DeleteEnterpriseTecnicoController;