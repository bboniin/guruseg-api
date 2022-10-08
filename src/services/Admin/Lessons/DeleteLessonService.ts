import prismaClient from '../../../prisma'

interface LessonRequest {
    userId: string;
    id: string;
}

class DeleteLessonService {
    async execute({ userId, id }: LessonRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const lessons = await prismaClient.lesson.delete({
            where: {
                id: id,
            },
        })

        return (lessons)
    }
}

export { DeleteLessonService }