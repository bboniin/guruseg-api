import { Request, Response } from "express";
import { CreateUserService } from "../../../services/Admin/Users/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      signature,
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
      phone_number,
      resale,
      course,
      modules,
      courses,
    } = req.body;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    let courseBoolean = course == "true" ? true : false;
    let resaleBoolean = resale == "true" ? true : false;
    let signatureBoolean = signature == "true" ? true : false;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      city,
      state,
      phone_number,
      services,
      courses,
      category,
      signature: signatureBoolean,
      sector1_id,
      sector2_id,
      sector3_id,
      sector4_id,
      sector5_id,
      password,
      photo,
      courseBoolean,
      resaleBoolean,
      modules,
    });

    return res.json(user);
  }
}

export { CreateUserController };
