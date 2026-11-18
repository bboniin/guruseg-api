"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAssociateController = void 0;
var _CreateAssociateService = require("../../../services/Admin/Associates/CreateAssociateService");
class CreateAssociateController {
  async handle(req, res) {
    const {
      name,
      email,
      password,
      cnpj,
      cpf,
      phone_number,
      comission,
      accounting_name,
      city,
      state,
      user_id
    } = req.body;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    const createAssociateService = new _CreateAssociateService.CreateAssociateService();
    const associate = await createAssociateService.execute({
      name,
      email,
      password,
      photo,
      cnpj,
      cpf,
      phone_number,
      accounting_name,
      comission: Number(comission),
      city,
      state,
      user_id
    });
    return res.json(associate);
  }
}
exports.CreateAssociateController = CreateAssociateController;