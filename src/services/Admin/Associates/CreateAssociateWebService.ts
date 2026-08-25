import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";
import { validateEmail } from "../../../config/functions";

interface AssociateRequest {
  name: string;
  email: string;
  accounting_name: string;
  phone_number: string;
  city: string;
  state: string;
}

class CreateAssociateWebService {
  async execute({
    name,
    email,
    phone_number,
    city,
    accounting_name,
    state,
  }: AssociateRequest) {
    if (!email || !name || !phone_number) {
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

    const password = phone_number.slice(-4);

    const passwordHash = await hash(password, 8);

    const associate = await prismaClient.associate.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        accounting_name: accounting_name,
        phone_number: phone_number,
        comission: 20,
        city: city,
        state: state,
      },
    });

    console.log(associate);

    return associate;
  }
}

export { CreateAssociateWebService };
