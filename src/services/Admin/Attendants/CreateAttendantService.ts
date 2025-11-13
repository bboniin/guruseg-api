import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";
import S3Storage from "../../../utils/S3Storage";

interface AttendantRequest {
  name: string;
  email: string;
  phone_number: string;
  photo: string;
  enabled: boolean;
  password: string;
  sector: string;
  user_id: string;
}

class CreateAttendantService {
  async execute({
    name,
    email,
    phone_number,
    password,
    photo,
    sector,
    enabled,
  }: AttendantRequest) {
    if (!email || !name || !phone_number || !password || !sector) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const AttendantAlreadyExistEmail = await prismaClient.attendant.findFirst({
      where: {
        email: email,
      },
    });

    if (AttendantAlreadyExistEmail) {
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
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
      },
    });

    return attendant;
  }
}

export { CreateAttendantService };
