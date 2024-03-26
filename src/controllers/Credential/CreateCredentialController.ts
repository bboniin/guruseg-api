import { Request, Response } from 'express';
import { CreateCredentialService } from '../../services/Credential/CreateCredentialService';

class CreateCredentialController {
    async handle(req: Request, res: Response) {
        const { email, description, password, name, phone_number, state, city, served_cities, birthday, services, profession } = req.body

        let photo = ""
        if (req.file) {
            photo = req.file.filename
        }

        const createCredentialService = new CreateCredentialService

        const credential = await createCredentialService.execute({
            email, photo, description, password, name, phone_number, state, city, served_cities, birthday, services, profession
        })

        return res.json(credential)
    }
}

export { CreateCredentialController } 