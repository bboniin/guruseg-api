import { Request, Response } from 'express';
import { CreateCourseService } from '../../../services/Admin/Courses/CreateCourseService';

class CreateCourseController {
    async handle(req: Request, res: Response) {
        const { name, description } = req.body

        let photo = ""

        let userId = req.userId

        if (req.file) {
            photo = req.file.filename
        }

        const createCourseService = new CreateCourseService

        const course = await createCourseService.execute({
            userId, name, description, photo
        })

        if (course["photo"]) {
            course["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + course["photo"];
        }

        return res.json(course)
    }
}

export { CreateCourseController }