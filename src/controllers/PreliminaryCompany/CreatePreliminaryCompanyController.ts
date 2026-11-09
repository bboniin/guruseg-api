import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../utils/auth";
import { CreatePreliminaryCompanyService } from "../../services/PreliminaryCompany/CreatePreliminaryCompanyService";

class CreatePreliminaryCompanyController {
  async handle(req: Request, res: Response) {
    const { razao_social, observation } = req.body;
    let userId = req.userId;

    if (!userId && req.headers.authorization) {
      try {
        const authToken = req.headers.authorization;
        const [, token] = authToken.split(" ");
        const decoded: any = verify(token, authConfig.jwt.secret);
        userId = decoded.sub;
      } catch (err) {
        // Ignore invalid token if optional
      }
    }

    const createService = new CreatePreliminaryCompanyService();
    const result = await createService.execute({
      razao_social,
      observation,
      userId,
    });

    return res.json(result);
  }
}

export { CreatePreliminaryCompanyController };
