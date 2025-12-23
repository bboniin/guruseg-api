import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";
import S3Storage from "../../../utils/S3Storage";
import { String } from "aws-sdk/clients/cloudtrail";

interface AttendantRequest {
  name: string;
  email: string;
  photo: string;
  password: string;
  userId: String;
}

class CreateAttendantService {
  async execute({ name, email, password, photo, userId }: AttendantRequest) {
    if (!email || !name || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
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

    const attendant = await prismaClient.attendant.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        photo: photo,
      },
    });

    return attendant;
  }
}

export { CreateAttendantService };
