"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAttendantController = void 0;
var _CreateAttendantService = require("../../../services/Admin/Attendants/CreateAttendantService");
class CreateAttendantController {
  async handle(req, res) {
    const {
      name,
      email,
      password
    } = req.body;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    const createAttendantService = new _CreateAttendantService.CreateAttendantService();
    const attendant = await createAttendantService.execute({
      name,
      email,
      password,
      photo
    });
    return res.json(attendant);
  }
}
exports.CreateAttendantController = CreateAttendantController;