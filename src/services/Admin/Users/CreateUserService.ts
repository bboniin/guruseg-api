import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";
import S3Storage from "../../../utils/S3Storage";

interface UserRequest {
  name: string;
  email: string;
  phone_number: string;
  photo: string;
  password: string;
  modules: string;
  category: string;
  sector1_id: string;
  sector2_id: string;
  sector3_id: string;
  sector4_id: string;
  sector5_id: string;
  services: string;
  city: string;
  state: string;
  courses: string;
  leads_enabled: boolean;
  courses_enabled: boolean;
  marketing_enabled: boolean;
  credentials_enabled: boolean;
  value_pcmso: number;
  value_ltcat_atr: number;
  value_ltcat_medico: number;
  value_pgr_atr: number;
  value_lip: number;
  value_li: number;
  value_lp: number;
}

class CreateUserService {
  async execute({
    name,
    email,
    city,
    state,
    category,
    sector1_id,
    sector2_id,
    sector3_id,
    sector4_id,
    sector5_id,
    phone_number,
    password,
    photo,
    services,
    modules,
    leads_enabled,
    courses_enabled,
    marketing_enabled,
    credentials_enabled,
    value_pcmso,
    value_ltcat_atr,
    value_ltcat_medico,
    value_pgr_atr,
    value_lip,
    value_li,
    value_lp,
    courses,
  }: UserRequest) {
    if (!email || !name || !phone_number || !category || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrado.");
    }

    if (photo) {
      const s3Storage = new S3Storage();
      await s3Storage.saveFile(photo);
    } else {
      photo = "";
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        category: category,
        password: passwordHash,
        phone_number: phone_number,
        photo: photo,
        city: city,
        state: state,
        sector1_id: sector1_id,
        sector2_id: sector2_id,
        sector3_id: sector3_id,
        sector4_id: sector4_id,
        sector5_id: sector5_id,
        leads_enabled: leads_enabled,
        courses_enabled: courses_enabled,
        marketing_enabled: marketing_enabled,
        credentials_enabled: credentials_enabled,
        value_pcmso: value_pcmso,
        value_ltcat_atr: value_ltcat_atr,
        value_ltcat_medico: value_ltcat_medico,
        value_pgr_atr: value_pgr_atr,
        value_lip: value_lip,
        value_li: value_li,
        value_lp: value_lp,
        services: services,
        modules: modules,
        courses: courses,
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
