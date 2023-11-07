"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _CreateUserService = require("../../../services/Admin/Users/CreateUserService");

class CreateUserController {
  async handle(req, res) {
    const {
      name,
      email,
      signature,
      sector1_id,
      sector2_id,
      sector3_id,
      sector4_id,
      sector5_id,
      password,
      phone_number,
      resale,
      course,
      course_restricted
    } = req.body;
    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    let courseRestricted = course_restricted == "true" ? true : false;
    let courseBoolean = course == "true" ? true : false;
    let resaleBoolean = resale == "true" ? true : false;
    let signatureBoolean = signature == "true" ? true : false;
    const createUserService = new _CreateUserService.CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      phone_number,
      signature: signatureBoolean,
      sector1_id,
      sector2_id,
      sector3_id,
      sector4_id,
      sector5_id,
      password,
      photo,
      courseBoolean,
      resaleBoolean,
      courseRestricted
    });
    return res.json(user);
  }

}

exports.CreateUserController = CreateUserController;