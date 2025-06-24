import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import { Resend } from "resend";

interface BodyRequest {
  email: string;
}

class PasswordForgotService {
  async execute({ email }: BodyRequest) {
    if (!email) {
      throw new Error("Insira o email");
    }

    let user = {};

    const userC = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    user = userC;

    if (!user) {
      const collaborator = await prismaClient.collaborator.findFirst({
        where: {
          email: email,
        },
      });

      if (!collaborator) {
        const credential = await prismaClient.credential.findFirst({
          where: {
            email: email,
          },
        });
        if (!credential) {
          throw new Error("Usuário não encontrado");
        }
        user = credential;
      } else {
        user = collaborator;
      }
    }

    const code =
      Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;

    await prismaClient.passwordForgot.create({
      data: {
        user_email: email,
        code: String(code),
      },
    });

    const path = resolve(__dirname, "..", "..", "views", "forgotPassword.hbs");

    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse({
      code,
      name: user["name"],
    });

    const resend = new Resend(process.env.RESEND_KEY);

    await resend.emails.send({
      from: "Equipe Guruseg <noreply@gurusegead.com.br>",
      to: user["email"],
      subject: "[Guruseg] Recuperação de senha",
      html: templateHTML,
    });

    return;
  }
}

export { PasswordForgotService };
