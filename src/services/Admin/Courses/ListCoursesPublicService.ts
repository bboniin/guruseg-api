import prismaClient from '../../../prisma'

class ListCoursesPublicService {
    async execute() {

        const courses = await prismaClient.course.findMany({
            select: {
                name: true,
                photo: true,
                description: true,
                lessons: true,
                id: true
            },
            orderBy: {
                create_at: "desc"
            }
        })

        return (courses)
    }
}

export { ListCoursesPublicService }