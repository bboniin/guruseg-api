import { Request, Response } from 'express';
import { EditAdminUserService } from '../../../services/Admin/Users/EditAdminUserService';

class EditAdminUserController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number, password, course } = req.body

        const { id } = req.params

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let courseBoolean = course == "true" ? true : false

        const editAdminUserService = new EditAdminUserService

        const user = await editAdminUserService.execute({
            name, email, phone_number, photo, id, password, courseBoolean
        })

        if (user["photo"]) {
            user["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
        }

        return res.json(user)
    }
}

export { EditAdminUserController }