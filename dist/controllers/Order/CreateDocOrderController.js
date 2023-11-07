"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDocOrderController = void 0;

var _CreateDocOrderService = require("../../services/Order/CreateDocOrderService");

class CreateDocOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      type
    } = req.body;
    let file = "";

    if (req.file) {
      file = req.file.filename;
    }

    const createDocOrderService = new _CreateDocOrderService.CreateDocOrderService();
    const docs = await createDocOrderService.execute({
      id: parseInt(id),
      file,
      type
    });
    return res.json(docs);
  }

}

exports.CreateDocOrderController = CreateDocOrderController;