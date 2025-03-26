import { Request, Response } from 'express';
import { GetCredentialService } from '../../services/Credential/GetCredentialService';

class GetCredentialController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const getCredentialService = new GetCredentialService

        const credential = await getCredentialService.execute({
            id: id
        })

        if (credential) {
            if (credential["photo"]) {
                credential["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + credential["photo"];
            }
        }

        return res.json(credential)
    }
}

export { GetCredentialController }