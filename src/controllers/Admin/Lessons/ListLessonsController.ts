import { Request, Response } from 'express';
import { ListLessonsService } from '../../../services/Admin/Lessons/ListLessonsService';

class ListLessonsController {
    async handle(req: Request, res: Response) {

        const { course_id } = req.params

        let userId = req.userId

        const listLessonsService = new ListLessonsService

        const lessons = await listLessonsService.execute({
            userId, course_id
        })

        lessons.map((item) => {
            if (item["file"]) {
                item["file_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["file"];
            }
        })

        return res.json(lessons)
    }
}

export { ListLessonsController }