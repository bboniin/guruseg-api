import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

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

        const lesson = await prismaClient.lesson.findFirst({
            where: {
                id: id,
            },
        })

        if (lesson.file) {
            const s3Storage = new S3Storage()
            await s3Storage.deleteFile(lesson["file"])
        }

        const lessonD = await prismaClient.lesson.delete({
            where: {
                id: id,
            },
        })




        return (lessonD)
    }
}

export { DeleteLessonService }