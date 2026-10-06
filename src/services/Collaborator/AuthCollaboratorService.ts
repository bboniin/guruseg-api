import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "./../../utils/auth";
import S3Storage from "../../utils/S3Storage";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthCollaboratorService {
  async execute({ email, password }: AuthRequest) {
    const collaborator = await prismaClient.collaborator.findFirst({
      where: {
        email: email,
      },
    });

    if (!collaborator) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }

    const passwordMatch = await compare(password, collaborator.password);

    const token = sign(
      {
        name: collaborator.name,
        email: collaborator.email,
      },
      authConfig.jwt.secret,
      {
        subject: collaborator.id,
        expiresIn: "365d",
      },
    );

    if (!passwordMatch) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }
    const s3Storage = new S3Storage();

    const photo_url = collaborator.photo
      ? await s3Storage.getTemporaryUrl(collaborator.photo, 245)
      : "";

    return {
      user: {
        id: collaborator.id,
        name: collaborator.name,
        email: collaborator.email,
        type: collaborator.type,
        photo: collaborator.photo,
        photo_url: photo_url,
        phone_number: collaborator.phone_number,
      },
      token,
    };
  }
}

export { AuthCollaboratorService };
