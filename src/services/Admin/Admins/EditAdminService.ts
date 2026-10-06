import { hash } from "bcryptjs";
import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface CollaboratorRequest {
  name: string;
  email: string;
  photo: string;
  password: string;
  access_granted: string;
  id: string;
  userId: string;
}

class EditAdminService {
  async execute({
    name,
    password,
    email,
    photo,
    id,
    access_granted,
    userId,
  }: CollaboratorRequest) {
    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    if (admin?.id != "58e368a8-f71c-40da-a5f6-bcc31a7386ad" && id != userId) {
      throw new Error("Rota restrita ao administrador master");
    }
    const adminGet = await prismaClient.admin.findUnique({
      where: {
        id: id,
      },
    });

    if (!admin) {
      throw new Error("Administrador não encontrado");
    }

    if (!email || !name) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const alreadyExistEmail =
      (await prismaClient.admin.findFirst({
        where: {
          email: email,
          id: {
            not: id,
          },
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

    let data = {
      name: name,
      email: email,
      access_granted: access_granted,
    };

    if (password) {
      const passwordHash = await hash(password, 8);
      data["password"] = passwordHash;
    }

    if (photo) {
      const s3Storage = new S3Storage();

      if (adminGet["photo"]) {
        await s3Storage.deleteFile(adminGet["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);

      data["photo"] = upload;
    }

    const adminEdited = await prismaClient.admin.update({
      where: {
        id: id,
      },
      data: data,
    });

    const s3Storage = new S3Storage();
    if (adminEdited.photo) {
      adminEdited["photo_url"] = await s3Storage.getTemporaryUrl(
        adminEdited.photo,
        245,
      );
    }
    return adminEdited;
  }
}

export { EditAdminService };
