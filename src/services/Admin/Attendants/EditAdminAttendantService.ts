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
}

class EditAdminAttendantService {
  async execute({
    password,
    name,
    email,
    photo,
    id,
    enabled,
  }: AttendantRequest) {
    const Attendant = await prismaClient.attendant.findUnique({
      where: {
        id: id,
      },
    });

    if (!email || !name) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const AttendantExistEmail = await prismaClient.attendant.findFirst({
      where: {
        email: email,
      },
    });

    if (AttendantExistEmail) {
      if (AttendantExistEmail.email != Attendant.email) {
        throw new Error("Email já está sendo utilizado");
      }
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

      if (Attendant["photo"]) {
        await s3Storage.deleteFile(Attendant["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);

      data["photo"] = upload;
    }

    const AttendantR = await prismaClient.attendant.update({
      where: {
        id: id,
      },
      data: data,
    });

    return AttendantR;
  }
}

export { EditAdminAttendantService };
