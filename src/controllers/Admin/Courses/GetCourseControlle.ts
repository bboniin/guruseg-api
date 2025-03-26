import { Request, Response } from 'express';
import { GetCourseService } from '../../../services/Admin/Courses/GetCourseService';

class GetCourseController {
    async handle(req: Request, res: Response) {

        const { course_id } = req.params

        let userId = req.userId

        const getCourseService = new GetCourseService

        const course = await getCourseService.execute({
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

export { GetCourseController }