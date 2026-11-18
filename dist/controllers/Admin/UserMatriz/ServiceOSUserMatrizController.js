"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceOSUserMatrizController = void 0;
var _ServiceOSUserMatrizService = require("../../../services/Admin/UserMatriz/ServiceOSUserMatrizService");
class ServiceOSUserMatrizController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      start_date,
      service,
      end_date
    } = req.body;
    const serviceOSUserMatrizService = new _ServiceOSUserMatrizService.ServiceOSUserMatrizService();
    const servicoOS = await serviceOSUserMatrizService.execute({
      id,
      start_date,
      service,
      end_date
    });
    return res.json(servicoOS);
  }
}
exports.ServiceOSUserMatrizController = ServiceOSUserMatrizController;