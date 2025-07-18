import { Request, Response } from "express";
import { EditAdminUserService } from "../../../services/Admin/Users/EditAdminUserService";

class EditAdminUserController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      enable_payment,
      phone_number,
      services,
      city,
      state,
      category,
      signature,
      sector1_id,
      sector2_id,
      sector3_id,
      sector4_id,
      sector5_id,
      password,
      course,
      resale,
      modules,
      courses,
    } = req.body;

    const { id } = req.params;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    let courseBoolean = course == "true" ? true : false;
    let resaleBoolean = resale == "true" ? true : false;
    let signatureBoolean = signature == "true" ? true : false;

    const editAdminUserService = new EditAdminUserService();

    const user = await editAdminUserService.execute({
      name,
      email,
      enable_payment: enable_payment == "true",
      phone_number,
      services,
      city,
      state,
      category,
      signature: signatureBoolean,
      sector1_id,
      sector2_id,
      sector3_id,
      sector4_id,
      sector5_id,
      photo,
      courses,
      id,
      password,
      courseBoolean,
      resaleBoolean,
      modules,
    });

    if (user["photo"]) {
      user["photo_url"] =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
    }

    return res.json(user);
  }
}

export { EditAdminUserController };
