import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";
import S3Storage from "../../../utils/S3Storage";
import { String } from "aws-sdk/clients/cloudtrail";
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
  cnpj: string;
  phone_number: string;
  comission: number;
  city: string;
  cpf: string;
  state: string;
  user_id: string;
}

class CreateAssociateService {
  async execute({
    name,
    email,
    password,
    photo,
    cnpj,
    phone_number,
    cpf,
    comission,
    city,
    state,
    user_id,
  }: AssociateRequest) {
    if (!email || !name || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    if (!validateEmail(email)) {
      throw new Error("Email é inválido");
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
      (await prismaClient.associate.findFirst({
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

    if (cpf && !validateCpf(cpf)) {
      throw new Error("CPF é inválido");
    }
    if (cnpj && !validateCnpj(cnpj)) {
      throw new Error("CNPJ é inválido");
    }
    if (phone_number && !validatePhone(phone_number)) {
      throw new Error("Telefone é inválido");
    }

    const passwordHash = await hash(password, 8);

    const associate = await prismaClient.associate.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        photo: photo,
        cnpj: cnpj,
        phone_number: phone_number,
        comission: comission,
        city: city,
        cpf: cpf,
        state: state,
        user_id: user_id,
      },
    });

    return associate;
  }
}

export { CreateAssociateService };
