"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateModuleController = void 0;
var _CreateModuleService = require("../../../services/Admin/Courses/CreateModuleService");
class CreateModuleController {
  async handle(req, res) {
    const {
      name,
      description,
      restricted,
      order
    } = req.body;
    const createModuleService = new _CreateModuleService.CreateModuleService();
    const module = await createModuleService.execute({
      name,
      order,
      description,
      restricted
    });
    return res.json(module);
  }
}
exports.CreateModuleController = CreateModuleController;