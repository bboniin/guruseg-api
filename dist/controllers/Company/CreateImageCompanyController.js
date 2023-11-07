"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateImageCompanyController = void 0;

var _CreateImageCompanyService = require("../../services/Company/CreateImageCompanyService");

class CreateImageCompanyController {
  async handle(req, res) {
    const {
      company_id
    } = req.params;
    const {
      index
    } = req.body;
    let file = "";

    if (req.file) {
      file = req.file.filename;
    }

    const createImageCompanyService = new _CreateImageCompanyService.CreateImageCompanyService();
    const image = await createImageCompanyService.execute({
      company_id,
      index: parseInt(index) || 0,
      file
    });
    image["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + image.photo;
    return res.json(image);
  }

}

exports.CreateImageCompanyController = CreateImageCompanyController;