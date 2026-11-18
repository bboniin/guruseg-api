"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteModuleController = void 0;
var _DeleteModuleService = require("../../../services/Admin/Courses/DeleteModuleService");
class DeleteModuleController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteModuleService = new _DeleteModuleService.DeleteModuleService();
    const module = await deleteModuleService.execute({
      id
    });
    return res.json(module);
  }
}
exports.DeleteModuleController = DeleteModuleController;