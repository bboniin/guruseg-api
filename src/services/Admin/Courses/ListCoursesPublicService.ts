import prismaClient from '../../../prisma'


interface CourseRequest {
    userId: string;
}

class ListCoursesPublicService {
    async execute({ userId }: CourseRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        let filter = {}

        if (user.course_restricted) {
            filter = {
                    restricted: true
                }
        }

        const courses = await prismaClient.course.findMany({
            where: filter,
            select: {
                name: true,
                photo: true,
                description: true,
                lessons: true,
                id: true
            },
            orderBy: {
                order: "asc"
            }
        })

        return (courses)
    }
}

export { ListCoursesPublicService }