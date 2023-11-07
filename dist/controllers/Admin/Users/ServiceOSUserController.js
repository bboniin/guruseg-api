"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceOSUserController = void 0;

var _ServiceOSUserService = require("../../../services/Admin/Users/ServiceOSUserService");

class ServiceOSUserController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      start_date,
      service,
      end_date
    } = req.body;
    const serviceOSUserService = new _ServiceOSUserService.ServiceOSUserService();
    const servicoOS = await serviceOSUserService.execute({
      id,
      start_date,
      service,
      end_date
    });
    return res.json(servicoOS);
  }

}

exports.ServiceOSUserController = ServiceOSUserController;