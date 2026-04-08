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

    const associate = await prismaClient.associate.findFirst({
      where: {
        email: email,
      },
    });
    if (!user && !collaborator && !admin && !attendant && !associate) {
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
        },
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
          courses_enabled: user.courses_enabled,
          leads_enabled: user.leads_enabled,
          marketing_enabled: user.marketing_enabled,
          credentials_enabled: user.credentials_enabled,
          phone_number: user.phone_number,
          category: user.category,
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
        },
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
        },
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
        },
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
    if (associate) {
      const passwordMatch = await compare(password, associate.password);

      const token = sign(
        {
          email: associate.email,
        },
        authConfig.jwt.secret,
        {
          subject: associate.id,
          expiresIn: "365d",
        },
      );

      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }

      let photo_url =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + associate.photo;

      return {
        user: {
          id: associate.id,
          email: associate.email,
          name: associate.name,
          photo: associate.photo,
          phone_number: associate.phone_number,
          comission: associate.comission,
          state: associate.state,
          city: associate.city,
          photo_url: photo_url,
          type: associate.type,
          cpf: associate.cpf,
          terms_accepted: associate.terms_accepted,
          type_pix: associate.type_pix,
          key_pix: associate.key_pix,
        },
        token,
      };
    }
  }
}

export { AuthUserService };
