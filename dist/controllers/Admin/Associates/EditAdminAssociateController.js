"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAdminAssociateController = void 0;
var _EditAdminAssociateService = require("../../../services/Admin/Associates/EditAdminAssociateService");
class EditAdminAssociateController {
  async handle(req, res) {
    const {
      name,
      email,
      password,
      cnpj,
      accounting_name,
      phone_number,
      comission,
      city,
      state,
      cpf,
      user_id
    } = req.body;
    const {
      id
    } = req.params;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    const editAdminAssociateService = new _EditAdminAssociateService.EditAdminAssociateService();
    const associate = await editAdminAssociateService.execute({
      name,
      email,
      photo,
      password,
      id,
      cnpj,
      accounting_name,
      phone_number,
      comission: Number(comission),
      city,
      state,
      cpf,
      user_id
    });
    return res.json(associate);
  }
}
exports.EditAdminAssociateController = EditAdminAssociateController;