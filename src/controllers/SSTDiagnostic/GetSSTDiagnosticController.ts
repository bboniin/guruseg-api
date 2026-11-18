import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../utils/auth";
import { GetSSTDiagnosticService } from "../../services/SSTDiagnostic/GetSSTDiagnosticService";

class GetSSTDiagnosticController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    let userId = req.userId;

    if (!userId && req.headers.authorization) {
      try {
        const authToken = req.headers.authorization;
        const [, token] = authToken.split(" ");
        const decoded: any = verify(token, authConfig.jwt.secret);
        userId = decoded.sub;
      } catch (err) {
        // Token inválido ou expirado em rota pública
      }
    }

    const getService = new GetSSTDiagnosticService();
    const result = await getService.execute({
      id,
      userId,
    });

    return res.json(result);
  }
}

export { GetSSTDiagnosticController };
