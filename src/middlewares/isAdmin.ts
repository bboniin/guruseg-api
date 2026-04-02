import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "./../utils/auth";
import prismaClient from "../prisma";

interface Payload {
  sub: string;
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Token não enviado" });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, authConfig.jwt.secret) as Payload;

    const admin = await prismaClient.admin.findFirst({
      where: {
        id: sub,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Rota restrita ao administrador" });
  }
}
