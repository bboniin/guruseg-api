import { hash } from "bcryptjs";
import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";
import {
  validateCnpj,
  validateCpf,
  validateEmail,
  validatePhone,
} from "../../../config/functions";

interface AssociateRequest {
  name: string;
  email: string;
  photo: string;
  password: string;
  id: string;
  userId: string;
  cnpj: string;
  cpf: string;
  phone_number: string;
  comission: number;
  city: string;
  state: string;
  user_id: string;
}

class EditAdminAssociateService {
  async execute({
    password,
    name,
    email,
    photo,
    id,
    userId,
    cnpj,
    cpf,
    phone_number,
    comission,
    city,
    state,
    user_id,
  }: AssociateRequest) {
    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const associate = await prismaClient.associate.findUnique({
      where: {
        id: id,
      },
    });

    if (!associate) {
      throw new Error("Associado não encontrado");
    }
    if (email && !validateEmail(email)) {
      throw new Error("Email é inválido");
    }
    if (email) {
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
        (await prismaClient.associate.findFirst({
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
    }

    if (cpf && !validateCpf(cpf)) {
      throw new Error("CPF é inválido");
    }
    if (cnpj && !validateCnpj(cnpj)) {
      throw new Error("CNPJ é inválido");
    }
    if (phone_number && !validatePhone(phone_number)) {
      throw new Error("Telefone é inválido");
    }

    let data = {
      name: name || associate.name,
      email: email || associate.email,
      cnpj: cnpj || associate.cnpj,
      phone_number: phone_number || associate.phone_number,
      comission: comission || associate.comission,
      city: city || associate.city,
      state: state || associate.state,
      cpf: cpf || associate.cpf,
      user_id: user_id,
    };

    if (password) {
      const passwordHash = await hash(password, 8);
      data["password"] = passwordHash;
    }

    if (photo) {
      const s3Storage = new S3Storage();

      if (associate["photo"]) {
        await s3Storage.deleteFile(associate["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);

      data["photo"] = upload;
    }

    const associateEdited = await prismaClient.associate.update({
      where: {
        id: id,
      },
      data: data,
    });

    return associateEdited;
  }
}

export { EditAdminAssociateService };
