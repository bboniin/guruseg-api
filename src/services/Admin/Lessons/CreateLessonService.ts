import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface LessonRequest {
    name: string;
    course_id: string;
    description: string;
    video: string;
    file: string;
    file_name: string;
    order: string;
    userId: string;
}

class CreateLessonService {
    async execute({ name, userId, file, description, video, order, course_id, file_name }: LessonRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        if (!name || (!file && !description && !video)) {
            throw new Error("Preencha o Nome da aula e algum conteúdooo")
        }

        if (file) {
            const s3Storage = new S3Storage()
            await s3Storage.saveFile(file)
        }

        let orderC = parseInt(order)

        if (!orderC) {
            orderC = 0
        }


        const lessonRes = await prismaClient.lesson.create({
            data: {
                name: name,
                description: description,
                video: video,
                file_name: file_name,
                course_id: course_id,
                file: file,
                order: orderC
            }
        })

        return (lessonRes)

    }
}

export { CreateLessonService }