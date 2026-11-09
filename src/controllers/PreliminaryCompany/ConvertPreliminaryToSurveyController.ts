import { Request, Response } from "express";
import { ConvertPreliminaryToSurveyService } from "../../services/PreliminaryCompany/ConvertPreliminaryToSurveyService";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

class ConvertPreliminaryToSurveyController {
  async handle(req: Request, res: Response) {
    const { company_id } = req.params;

    let userId = (req as any).userId;

    // Se a rota for chamada sem passar pelo middleware isAuthenticated, tentar extrair token opcional
    if (!userId) {
      const authToken = req.headers.authorization;
      if (authToken) {
        const [, token] = authToken.split(" ");
        try {
          const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;
          userId = sub;
        } catch {
          // Token inválido ou expirado, segue sem userId
        }
      }
    }

    const convertService = new ConvertPreliminaryToSurveyService();
    const result = await convertService.execute({
      preliminary_id: company_id,
      user_id: userId,
    });

    return res.json(result);
  }
}

export { ConvertPreliminaryToSurveyController };
