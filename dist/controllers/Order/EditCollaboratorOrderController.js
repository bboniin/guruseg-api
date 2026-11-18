"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCollaboratorOrderController = void 0;
var _EditCollaboratorOrderService = require("../../services/Order/EditCollaboratorOrderService");
class EditCollaboratorOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      collaborator_id
    } = req.body;
    let userId = req.userId;
    const editCollaboratorOrderService = new _EditCollaboratorOrderService.EditCollaboratorOrderService();
    const order = await editCollaboratorOrderService.execute({
      collaborator_id,
      userId,
      id: parseInt(id)
    });
    return res.json(order);
  }
}
exports.EditCollaboratorOrderController = EditCollaboratorOrderController;