import { Request, Response } from 'express';
import { GetCoursePublicService } from '../../../services/Admin/Courses/GetCoursePublicService';

class GetCoursePublicController {
    async handle(req: Request, res: Response) {

        const { course_id } = req.params

        let userId = req.userId

        const getCoursePublicService = new GetCoursePublicService

        const course = await getCoursePublicService.execute({
            userId, course_id
        })

        course.lessons.map((item) => {
            if (item["file"]) {
                item["file_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["file"];
            }
        })

        return res.json(course)
    }
}

export { GetCoursePublicController }