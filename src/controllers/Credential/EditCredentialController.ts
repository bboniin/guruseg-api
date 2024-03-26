import { Request, Response } from 'express';
import { EditCredentialService } from '../../services/Credential/EditCredentialService';

class EditCredentialController {
    async handle(req: Request, res: Response) {
        const { email, password, name, description, phone_number, state, city, served_cities, birthday, services, profession } = req.body

        let userId = req.userId

        let photo = ""
        if (req.file) {
            photo = req.file.filename
        }

        const editCredentialService = new EditCredentialService

        const credential = await editCredentialService.execute({
            userId, description, photo, email, password, name, phone_number, state, city, served_cities, birthday, services, profession
        })

        return res.json(credential)
    }
}

export { EditCredentialController } 