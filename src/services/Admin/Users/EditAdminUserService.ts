import { hash } from "bcryptjs";
import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface UserRequest {
  name: string;
  email: string;
  phone_number: string;
  photo: string;
  password: string;
  id: string;
  category: string;
  courseBoolean: boolean;
  resaleBoolean: boolean;
  restrictedBoolean: boolean;
  modules: string;
  signatureBoolean: boolean;
  sector1_id: string;
  sector2_id: string;
  sector3_id: string;
  sector4_id: string;
  services: string;
  sector5_id: string;
  city: string;
  state: string;
  courses: string;
}

class EditAdminUserService {
  async execute({
    name,
    email,
    city,
    state,
    signatureBoolean,
    category,
    sector1_id,
    sector2_id,
    sector3_id,
    sector4_id,
    sector5_id,
    services,
    phone_number,
    photo,
    id,
    password,
    courseBoolean,
    courses,
    resaleBoolean,
    restrictedBoolean,
    modules,
  }: UserRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("Franqueado não encontrado");
    }

    if (!email || !name || !category || !phone_number) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const userExist = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      if (userExist.email != user.email) {
        throw new Error("Email já está sendo utilizado");
      }
    }

    let data = {
      name: name,
      email: email,
      category: category,
      course: courseBoolean,
      signature: signatureBoolean,
      phone_number: phone_number,
      sector1_id: sector1_id,
      sector2_id: sector2_id,
      sector3_id: sector3_id,
      sector4_id: sector4_id,
      sector5_id: sector5_id,
      resale: resaleBoolean,
      restricted: restrictedBoolean,
      state: state,
      city: city,
      services: services,
      modules: modules,
      courses: courses,
    };

    if (password) {
      const passwordHash = await hash(password, 8);
      data["password"] = passwordHash;
    }

    if (photo) {
      const s3Storage = new S3Storage();

      if (user["photo"]) {
        await s3Storage.deleteFile(user["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);

      data["photo"] = upload;
    }

    const userRes = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: data,
    });

    return userRes;
  }
}

export { EditAdminUserService };
