import { Request, Response } from "express";
import { EditAdminUserService } from "../../../services/Admin/Users/EditAdminUserService";

class EditAdminUserController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      phone_number,
      services,
      city,
      state,
      category,
      sector1_id,
      sector2_id,
      sector3_id,
      sector4_id,
      sector5_id,
      password,
      leads_enabled,
      courses_enabled,
      marketing_enabled,
      credentials_enabled,
      value_pcmso,
      value_ltcat_atr,
      value_ltcat_medico,
      value_pgr_atr,
      value_lip,
      value_li,
      value_lp,
      modules,
      courses,
    } = req.body;

    const { id } = req.params;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    console.log(req.body);
    const editAdminUserService = new EditAdminUserService();

    const user = await editAdminUserService.execute({
      name,
      email,
      phone_number,
      services,
      city,
      state,
      category,
      sector1_id,
      sector2_id,
      sector3_id,
      sector4_id,
      sector5_id,
      photo,
      courses,
      id,
      password,
      modules,
      leads_enabled: leads_enabled == "true",
      courses_enabled: courses_enabled == "true",
      marketing_enabled: marketing_enabled == "true",
      credentials_enabled: credentials_enabled == "true",
      value_pcmso: Number(value_pcmso) || 0,
      value_ltcat_atr: Number(value_ltcat_atr) || 0,
      value_ltcat_medico: Number(value_ltcat_medico) || 0,
      value_pgr_atr: Number(value_pgr_atr) || 0,
      value_lip: Number(value_lip) || 0,
      value_li: Number(value_li) || 0,
      value_lp: Number(value_lp) || 0,
    });

    if (user["photo"]) {
      user["photo_url"] =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
    }

    return res.json(user);
  }
}

export { EditAdminUserController };
