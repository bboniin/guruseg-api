import { Request, Response } from 'express';
import { ListCoursesPublicService } from '../../../services/Admin/Courses/ListCoursesPublicService';

class ListCoursesPublicController {
    async handle(req: Request, res: Response) {

        const listCoursesPublicService = new ListCoursesPublicService

        const coursesPublic = await listCoursesPublicService.execute()

        coursesPublic.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })


        return res.json(coursesPublic)
    }
}

export { ListCoursesPublicController }