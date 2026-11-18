"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditModuleController = void 0;
var _EditModuleService = require("../../../services/Admin/Courses/EditModuleService");
class EditModuleController {
  async handle(req, res) {
    const {
      name,
      description,
      restricted,
      order
    } = req.body;
    const {
      id
    } = req.params;
    const editModuleService = new _EditModuleService.EditModuleService();
    const module = await editModuleService.execute({
      name,
      description,
      order,
      id,
      restricted
    });
    return res.json(module);
  }
}
exports.EditModuleController = EditModuleController;