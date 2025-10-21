import { Request, Response } from "express";
import { GetAssistentService } from "../../services/IA/GetAssistentService";

class GetAssistentController {
  async handle(req: Request, res: Response) {
    const { ask } = req.query;

    const getAssistentService = new GetAssistentService();

    const resAssistent = await getAssistentService.execute({
      ask: String(ask || ""),
    });
    return res.json(resAssistent);
  }
}

export { GetAssistentController };
