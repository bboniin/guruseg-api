import prismaClient from '../../../prisma'

interface LessonRequest {
    userId: string;
    course_id: string;
}

class ListLessonsService {
    async execute({ userId, course_id }: LessonRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const lessons = await prismaClient.lesson.findMany({
            where: {
                course_id: course_id
            },
            orderBy: {
                create_at: "desc"
            }
        })

        return (lessons)
    }
}

export { ListLessonsService }