import { Request, Response } from 'express';
import { AdminCreateCredentialService } from '../../services/Credential/AdminCreateCredentialService';

class AdminCreateCredentialController {
    async handle(req: Request, res: Response) {
        const { email, description, password, name, phone_number, state, city, served_cities, birthday, services, profession } = req.body


        let photo = ""
        if (req.file) {
            photo = req.file.filename
        }

        const adminCreateCredentialService = new AdminCreateCredentialService

        const credential = await adminCreateCredentialService.execute({
            email, photo, description, password, name, phone_number, state, city, served_cities, birthday, services, profession
        })

        return res.json(credential)
    }
}

export { AdminCreateCredentialController } 