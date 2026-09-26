import { Request, Response } from "express";
import { ServiceOSUserMatrizService } from "../../../services/Admin/UserMatriz/ServiceOSUserMatrizService";

class ServiceOSUserMatrizController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { start_date, service, end_date } = req.body;

    const serviceOSUserMatrizService = new ServiceOSUserMatrizService();

    const servicoOS = await serviceOSUserMatrizService.execute({
      id,
      start_date,
      service,
      end_date,
    });

    return res.json(servicoOS);
  }
}

export { ServiceOSUserMatrizController };
