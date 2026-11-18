"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteEmployeController = void 0;
var _DeleteEmployeService = require("../../services/Company/DeleteEmployeService");
class DeleteEmployeController {
  async handle(req, res) {
    const {
      employe_id
    } = req.params;
    let userId = req.userId;
    const deleteEmployeService = new _DeleteEmployeService.DeleteEmployeService();
    const image = await deleteEmployeService.execute({
      employe_id,
      userId
    });
    return res.json(image);
  }
}
exports.DeleteEmployeController = DeleteEmployeController;