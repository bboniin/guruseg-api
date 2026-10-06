import { Request, Response } from "express";
import { ListCredentialsService } from "../../services/Credential/ListCredentialsService";

class ListCredentialsController {
  async handle(req: Request, res: Response) {
    let { page, state, city, service } = req.query;

    const listCredentialsService = new ListCredentialsService();

    const credentials = await listCredentialsService.execute({
      state: state ? String(state) : "",
      city: city ? String(city) : "",
      service: service ? String(service) : "",
      page: Number(page) > 0 ? Number(page) : 0,
    });

    return res.json(credentials);
  }
}

export { ListCredentialsController };
