"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAssociateController = void 0;
var _GetAssociateService = require("../../services/Associate/GetAssociateService");
class GetAssociateController {
  async handle(req, res) {
    let userId = req.userId;
    const getAssociateService = new _GetAssociateService.GetAssociateService();
    const associate = await getAssociateService.execute({
      userId
    });
    return res.json({
      id: associate.id,
      email: associate.email,
      name: associate.name,
      photo: associate.photo,
      phone_number: associate.phone_number,
      comission: associate.comission,
      state: associate.state,
      city: associate.city,
      photo_url: associate["photo_url"],
      type: associate.type,
      cpf: associate.cpf,
      terms_accepted: associate.terms_accepted,
      type_pix: associate.type_pix,
      key_pix: associate.key_pix
    });
  }
}
exports.GetAssociateController = GetAssociateController;