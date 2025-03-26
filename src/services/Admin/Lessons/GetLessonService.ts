import prismaClient from '../../../prisma'

interface LessonRequest {
    userId: string;
    id: string;
}

class GetLessonService {
    async execute({ userId, id }: LessonRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const lesson = await prismaClient.lesson.findUnique({
            where: {
                id: id,
            }
        })

        return (lesson)
    }
}

export { GetLessonService }