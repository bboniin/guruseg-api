import { Request, Response } from "express";
import { DeleteAttendantService } from "../../../services/Admin/Attendants/DeleteAttendantService";

class DeleteAttendantController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteAttendantService = new DeleteAttendantService();

    const attendant = await deleteAttendantService.execute({
      id,
    });

    return res.json(attendant);
  }
}

export { DeleteAttendantController };
