import { Request, Response } from "express";
import { GetCredentialService } from "../../services/Credential/GetCredentialService";

class GetCredentialController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getCredentialService = new GetCredentialService();

    const credential = await getCredentialService.execute({
      id: id,
    });

    return res.json(credential);
  }
}

export { GetCredentialController };
