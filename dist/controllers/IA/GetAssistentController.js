"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAssistentController = void 0;
var _GetAssistentService = require("../../services/IA/GetAssistentService");
class GetAssistentController {
  async handle(req, res) {
    const {
      ask
    } = req.query;
    const getAssistentService = new _GetAssistentService.GetAssistentService();
    const resAssistent = await getAssistentService.execute({
      ask: String(ask || "")
    });
    return res.json(resAssistent);
  }
}
exports.GetAssistentController = GetAssistentController;