import { hash } from "bcryptjs";
import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface AttendantRequest {
  name: string;
  email: string;
  photo: string;
  password: string;
  enabled: boolean;
  id: string;
  userId: string;
}

class EditAttendantService {
  async execute({
    password,
    name,
    email,
    photo,
    id,
    enabled,
    userId,
  }: AttendantRequest) {
    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    if (!email || !name) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const attendant = await prismaClient.attendant.findUnique({
      where: {
        id: id,
      },
    });

    if (!attendant) {
      throw new Error("Atendente não encontrado");
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
          id: {
            not: id,
          },
        },
      }));

    if (alreadyExistEmail) {
      throw new Error("Email já cadastrado.");
    }

    let data = {
      name: name,
      email: email,
      enabled: enabled,
    };

    if (password) {
      const passwordHash = await hash(password, 8);
      data["password"] = passwordHash;
    }

    if (photo) {
      const s3Storage = new S3Storage();

      if (attendant["photo"]) {
        await s3Storage.deleteFile(attendant["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);

      data["photo"] = upload;
    }

    const attendantEdited = await prismaClient.attendant.update({
      where: {
        id: id,
      },
      data: data,
    });

    return attendantEdited;
  }
}

export { EditAttendantService };
