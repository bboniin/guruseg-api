import { hash } from "bcryptjs";
import {
  validateCnpj,
  validateCpf,
  validateEmail,
  validatePhone,
} from "../../config/functions";
import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface AssociateRequest {
  name: string;
  email: string;
  phone_number: string;
  photo: string;
  associateId: string;
  cnpj: string;
  comission: number;
  city: string;
  state: string;
  cpf: string;
  type_pix: string;
  key_pix: string;
  password: string;
  terms_accepted: boolean;
}

class EditAssociateService {
  async execute({
    name,
    email,
    phone_number,
    photo,
    cpf,
    key_pix,
    type_pix,
    password,
    associateId,
    cnpj,
    comission,
    city,
    state,
    terms_accepted,
  }: AssociateRequest) {
    const associate = await prismaClient.associate.findUnique({
      where: {
        id: associateId,
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
              not: associateId,
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

    if (type_pix && !key_pix) {
      throw new Error("Preencha a chave pix");
    }
    if (key_pix && type_pix) {
      if (type_pix == "EMAIL") {
        if (!validateEmail(key_pix)) {
          throw new Error("Chave PIX Email é inválido");
        }
      }
      if (type_pix == "CPF") {
        if (!validateCpf(key_pix)) {
          throw new Error("Chave PIX CPF é inválido");
        }
      }
      if (type_pix == "CNPJ") {
        if (!validateCnpj(key_pix)) {
          throw new Error("Chave PIX CNPJ é inválido");
        }
      }
      if (type_pix == "PHONE") {
        if (!validatePhone(key_pix)) {
          throw new Error("Chave PIX Telefone é inválido");
        }
      }
    }

    let data = {
      name: name || associate.name,
      email: email || associate.email,
      cnpj: cnpj || associate.cnpj,
      phone_number: phone_number || associate.phone_number,
      comission: comission || associate.comission,
      city: city || associate.city,
      state: state || associate.state,
      key_pix: key_pix && type_pix ? key_pix : associate.key_pix,
      type_pix: key_pix && type_pix ? type_pix : associate.type_pix,
      cpf: cpf || associate.cpf,
    };

    if (terms_accepted) {
      data["terms_accepted"] = true;
      data["terms_accepted_at"] = new Date();
    }

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
        id: associateId,
      },
      data: data,
    });
    return associateEdited;
  }
}

export { EditAssociateService };
