import { Request, Response } from "express";
import { GetAttendantAdminService } from "../../../services/Admin/Attendants/GetAttendantAdminService";

class GetAttendantAdminController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getAttendantAdminService = new GetAttendantAdminService();

    const attendant = await getAttendantAdminService.execute({
      id,
    });
    if (attendant) {
      if (attendant["photo"]) {
        attendant["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" +
          attendant["photo"];
      }
    }

    return res.json(attendant);
  }
}

export { GetAttendantAdminController };
