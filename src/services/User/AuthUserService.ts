import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "./../../utils/auth";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    const admin = await prismaClient.admin.findFirst({
      where: {
        email: email,
      },
    });

    const collaborator = await prismaClient.collaborator.findFirst({
      where: {
        email: email,
      },
    });

    const attendant = await prismaClient.attendant.findFirst({
      where: {
        email: email,
      },
    });

    if (!user && !collaborator && !admin && !attendant) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }

    if (user) {
      const passwordMatch = await compare(password, user.password);

      const token = sign(
        {
          name: user.name,
          email: user.email,
        },
        authConfig.jwt.secret,
        {
          subject: user.id,
          expiresIn: "365d",
        }
      );

      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }

      let photo_url =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + user.photo;

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type,
          photo: user.photo,
          photo_url: photo_url,
          course: user.course,
          resale: user.resale,
          signature: user.signature,
          costumer_id: user.costumer_id,
          phone_number: user.phone_number,
        },
        token,
      };
    }
    if (collaborator) {
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
        }
      );

      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }

      let photo_url =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + collaborator.photo;

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
    if (admin) {
      const passwordMatch = await compare(password, admin.password);

      const token = sign(
        {
          email: admin.email,
        },
        authConfig.jwt.secret,
        {
          subject: admin.id,
          expiresIn: "365d",
        }
      );

      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }
      let photo_url =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + admin.photo;

      return {
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          photo: admin.photo,
          photo_url: photo_url,
          access_granted: admin.access_granted,
          type: admin.type,
        },
        token,
      };
    }
    if (attendant) {
      const passwordMatch = await compare(password, attendant.password);

      const token = sign(
        {
          email: attendant.email,
        },
        authConfig.jwt.secret,
        {
          subject: attendant.id,
          expiresIn: "365d",
        }
      );

      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }

      let photo_url =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + attendant.photo;

      return {
        user: {
          id: attendant.id,
          email: attendant.email,
          name: attendant.name,
          photo: attendant.photo,
          enabled: attendant.enabled,
          photo_url: photo_url,
          type: attendant.type,
        },
        token,
      };
    }
  }
}

export { AuthUserService };
