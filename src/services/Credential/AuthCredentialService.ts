import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../utils/auth";
import S3Storage from "../../utils/S3Storage";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthCredentialService {
  async execute({ email, password }: AuthRequest) {
    const credential = await prismaClient.credential.findFirst({
      where: {
        email: email,
      },
    });

    if (!credential) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }

    const passwordMatch = await compare(password, credential.password);

    const token = sign(
      {
        name: credential.name,
        email: credential.email,
      },
      authConfig.jwt.secret,
      {
        subject: credential.id,
        expiresIn: "365d",
      },
    );

    if (!passwordMatch) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }

    const s3Storage = new S3Storage();

    const photo_url = credential.photo
      ? await s3Storage.getTemporaryUrl(credential.photo, 245)
      : "";

    return {
      credential: {
        id: credential.id,
        name: credential.name,
        email: credential.email,
        type: "credential",
        photo: credential.photo,
        photo_url: photo_url,
        phone_number: credential.phone_number,
      },
      token,
    };
  }
}

export { AuthCredentialService };
