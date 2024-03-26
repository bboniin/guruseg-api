import { Request, Response } from 'express';
import { AdminEditCredentialService } from '../../services/Credential/AdminEditCredentialService';

class AdminEditCredentialController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { email, visible, description, password, name, phone_number, state, city, served_cities, birthday, services, profession } = req.body

        let photo = ""
        if (req.file) {
            photo = req.file.filename
        }

        const adminEditCredentialService = new AdminEditCredentialService

        const credential = await adminEditCredentialService.execute({
            id, photo, visible: visible == "true" ? true : false, description, email, password, name, phone_number, state, city, served_cities, birthday, services, profession
        })

        return res.json(credential)
    }
}

export { AdminEditCredentialController } 