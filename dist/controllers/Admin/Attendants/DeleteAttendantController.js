"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAttendantController = void 0;
var _DeleteAttendantService = require("../../../services/Admin/Attendants/DeleteAttendantService");
class DeleteAttendantController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteAttendantService = new _DeleteAttendantService.DeleteAttendantService();
    const attendant = await deleteAttendantService.execute({
      id
    });
    return res.json(attendant);
  }
}
exports.DeleteAttendantController = DeleteAttendantController;