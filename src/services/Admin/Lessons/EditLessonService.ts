import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface LessonRequest {
    name: string;
    id: string;
    description: string;
    video: string;
    file: string;
    file_name: string;
    order: string;
    delete_file: string;
    userId: string;
}
class EditLessonService {
    async execute({ name, userId, file, delete_file, description, order, video, id, file_name }: LessonRequest) {

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
                id: id
            },
        })


        if (!name || (!file && !description && !video)) {
            throw new Error("Preencha o Nome da aula e algum conteúdo")
        }

        if (!lesson) {
            throw new Error("Aula não existe")
        }

        let orderC = parseInt(order)

        if (!orderC) {
            orderC = 0
        }

        let data = {
            name: name,
            description: description,
            video: video,
            file_name: file_name,
            order: orderC
        }

        if (delete_file) {
            if (lesson.file) {
                const s3Storage = new S3Storage()
                await s3Storage.deleteFile(lesson["file"])
                data["file"] = ""
            }
        }

        if (file) {
            const s3Storage = new S3Storage()

            if (lesson["file"]) {
                await s3Storage.deleteFile(lesson["file"])
            }

            const upload = await s3Storage.saveFile(file)

            data["file"] = upload
        }

        const lessonRes = await prismaClient.lesson.update({
            where: {
                id: id
            },
            data: data
        })

        return (lessonRes)

    }
}

export { EditLessonService }