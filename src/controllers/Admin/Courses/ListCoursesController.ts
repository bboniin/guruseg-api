import { Request, Response } from 'express';
import { ListCoursesService } from '../../../services/Admin/Courses/ListCoursesService';

class ListCoursesController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listCoursesService = new ListCoursesService

        const courses = await listCoursesService.execute({
            userId
        })

        courses.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(courses)
    }
}

export { ListCoursesController }