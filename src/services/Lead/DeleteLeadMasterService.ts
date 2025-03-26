import prismaClient from '../../prisma'

interface LeadRequest {
    id: string;
}

class DeleteLeadMasterService {
    async execute({ id }: LeadRequest) {

        const lead = await prismaClient.leadMaster.delete({
            where: {
                id: id
            }
        })
        return (lead)
    }
}

export { DeleteLeadMasterService }