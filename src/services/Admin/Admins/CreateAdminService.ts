import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";
import S3Storage from "../../../utils/S3Storage";

interface AdminRequest {
  name: string;
  email: string;
  photo: string;
  password: string;
  access_granted: string;
  userId: string;
}

class CreateAdminService {
  async execute({
    name,
    email,
    userId,
    password,
    photo,
    access_granted,
  }: AdminRequest) {
    if (!email || !name || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    if (admin?.id != "58e368a8-f71c-40da-a5f6-bcc31a7386ad") {
      throw new Error("Rota restrita ao administrador master");
    }

    const alreadyExistEmail =
      (await prismaClient.admin.findFirst({
        where: {
          email: email,
        },
      })) ||
      (await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      })) ||
      (await prismaClient.collaborator.findFirst({
        where: {
          email: email,
        },
      })) ||
      (await prismaClient.attendant.findFirst({
        where: {
          email: email,
        },
      }));

    if (alreadyExistEmail) {
      throw new Error("Email já cadastrado.");
    }

    if (photo) {
      const s3Storage = new S3Storage();
      await s3Storage.saveFile(photo);
    } else {
      photo = "";
    }

    const passwordHash = await hash(password, 8);

    const adminCreated = await prismaClient.admin.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        access_granted: access_granted,
        photo: photo,
      },
    });

    return adminCreated;
  }
}

export { CreateAdminService };
