import { Request, Response } from 'express';
import { CreateLessonService } from '../../../services/Admin/Lessons/CreateLessonService';

class CreateLessonController {
    async handle(req: Request, res: Response) {
        const { name, description, video, file_name, course_id, order } = req.body

        let file = ""

        let userId = req.userId

        if (req.file) {
            file = req.file.filename
        }

        const createLessonService = new CreateLessonService

        const lesson = await createLessonService.execute({
            userId, name, description, video, file_name, file, course_id, order
        })

        return res.json(lesson)
    }
}

export { CreateLessonController }