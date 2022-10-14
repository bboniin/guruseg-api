import { Request, Response } from 'express';
import { EditCourseService } from '../../../services/Admin/Courses/EditCourseService';

class EditCourseController {
    async handle(req: Request, res: Response) {
        const { name, description, order } = req.body

        const { id } = req.params

        let userId = req.userId

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const editCourseService = new EditCourseService

        const course = await editCourseService.execute({
            name, description, order, photo, id, userId
        })

        if (course["photo"]) {
            course["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + course["photo"];
        }

        return res.json(course)
    }
}

export { EditCourseController }