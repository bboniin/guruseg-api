import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface CredentialRequest {
    email: string;
    name: string;
    password: string;
    phone_number: string;
    state: string;
    city: string;
    cpf: string;
    rg: string;
    served_cities: string;
    birthday: string;
    services: string;
    photo: string;
    description: string;
    profession: string;
    userId: string;
}

class EditCredentialService {
    async execute({ userId, email, description, photo, password, name, phone_number, rg, cpf, state, city, served_cities, birthday, services, profession }: CredentialRequest) {

        const credential = await prismaClient.credential.findUnique({
            where: {
                id: userId
            }
        })

        const credentialEmail = await prismaClient.credential.findUnique({
            where: {
                email: email
            }
        })

        if (credentialEmail) {
            if (credentialEmail.id != credential.id) {
                throw new Error("O email digitado já está sendo usado.")
            }
        }

        if (!email || !description || !name || !phone_number || !rg || !cpf || !state || !city || !served_cities || !birthday || !services || !profession) {
            throw new Error("Preencha todos os campos para salvar.")
        }

        let data = {
            name: name,
            email: email,
            rg: rg,
            phone_number: phone_number,
            state: state,
            city: city,
            served_cities: served_cities,
            birthday: birthday,
            services: services,
            profession: profession,
            description: description,
            cpf: cpf
        }

        if (password) {
            const passwordHash = await hash(password, 8)
            data["password"] = passwordHash
        } else {
            if (!credential.password) {
                throw new Error("Senha é obrigatório para efetuar o login")
            }
        }


        if (photo) {
            const s3Storage = new S3Storage()

            if (credential["photo"]) {
                await s3Storage.deleteFile(credential["photo"])
            }

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        } else {
            if (!credential.photo) {
                throw new Error("Envio da imagem é obrigatório")
            }
        }

        const credentialEdit = await prismaClient.credential.update({
            where: {
                id: userId
            },
            data: data
        })

        return (credentialEdit)
    }
}

export {
    EditCredentialService
}