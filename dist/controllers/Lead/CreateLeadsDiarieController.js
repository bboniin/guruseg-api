"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLeadsDiarieController = void 0;
var _CreateLeadsDiarieService = require("../../services/Lead/CreateLeadsDiarieService");
class CreateLeadsDiarieController {
  async handle(req, res) {
    const createLeadsDiarieService = new _CreateLeadsDiarieService.CreateLeadsDiarieService();
    const lead = await createLeadsDiarieService.execute();
    return res.json(lead);
  }
}
exports.CreateLeadsDiarieController = CreateLeadsDiarieController;