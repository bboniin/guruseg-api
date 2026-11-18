"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAttendantController = void 0;
var _EditAttendantService = require("../../../services/Admin/Attendants/EditAttendantService");
class EditAttendantController {
  async handle(req, res) {
    const {
      name,
      email,
      password,
      enabled
    } = req.body;
    const {
      id
    } = req.params;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    const editAttendantService = new _EditAttendantService.EditAttendantService();
    const attendant = await editAttendantService.execute({
      name,
      email,
      photo,
      password,
      id,
      enabled: enabled == "true" ? true : false
    });
    return res.json(attendant);
  }
}
exports.EditAttendantController = EditAttendantController;