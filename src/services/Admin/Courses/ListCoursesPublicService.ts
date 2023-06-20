import prismaClient from '../../../prisma'


interface CourseRequest {
    userId: string;
}

class ListCoursesPublicService {
    async execute({ userId }: CourseRequest) {

        let courses = await prismaClient.course.findMany({
            select: {
                name: true,
                photo: true,
                description: true,
                lessons: true,
                restricted: true,
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