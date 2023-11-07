import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface CompanyRequest {
    company_id: string;
    index: number;
    file: string;
}

class CreateImageCompanyService {
    async execute({ company_id, file, index }: CompanyRequest) {

        console.log(company_id, file)
        if (!company_id || !file) {
            throw new Error("Preencha todos os campos obrigátorios")
        }

        const s3Storage = new S3Storage()
        await s3Storage.saveFile(file)

        const image = await prismaClient.companyImages.create({
            data: {
                company_id: company_id,
                index: index,
                photo: file
            },
        })

        return (image)
    }
}

export { CreateImageCompanyService }