import { Request, Response } from 'express';
import { PublicEditCredentialService } from '../../services/Credential/PublicEditCredentialService';

class PublicEditCredentialController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { email, password, name, description, phone_number, state, city, served_cities, birthday, services, profession } = req.body

        let photo = ""
        if (req.file) {
            photo = req.file.filename
        }

        const publicEditCredentialService = new PublicEditCredentialService

        const credential = await publicEditCredentialService.execute({
            id, description, photo, email, password, name, phone_number, state, city, served_cities, birthday, services, profession
        })

        return res.json(credential)
    }
}

export { PublicEditCredentialController } 