import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";
import S3Storage from "../../../utils/S3Storage";

interface UserRequest {
  name: string;
  email: string;
  phone_number: string;
  photo: string;
  password: string;
  courseBoolean: boolean;
  modules: string;
  resaleBoolean: boolean;
  signature: boolean;
  category: string;
  sector1_id: string;
  sector2_id: string;
  sector3_id: string;
  sector4_id: string;
  sector5_id: string;
  services: string;
  city: string;
  state: string;
  courses: string;
}

class CreateUserService {
  async execute({
    name,
    email,
    city,
    state,
    signature,
    category,
    sector1_id,
    sector2_id,
    sector3_id,
    sector4_id,
    sector5_id,
    phone_number,
    password,
    photo,
    services,
    courseBoolean,
    resaleBoolean,
    modules,
    courses,
  }: UserRequest) {
    if (!email || !name || !phone_number || !category || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrado.");
    }

    if (photo) {
      const s3Storage = new S3Storage();
      await s3Storage.saveFile(photo);
    } else {
      photo = "";
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        category: category,
        password: passwordHash,
        phone_number: phone_number,
        photo: photo,
        city: city,
        state: state,
        signature: signature,
        sector1_id: sector1_id,
        sector2_id: sector2_id,
        sector3_id: sector3_id,
        sector4_id: sector4_id,
        sector5_id: sector5_id,
        course: courseBoolean,
        resale: resaleBoolean,
        services: services,
        modules: modules,
        courses: courses,
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
