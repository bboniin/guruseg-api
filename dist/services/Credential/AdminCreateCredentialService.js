"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminCreateCredentialService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

var _bcryptjs = require("bcryptjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AdminCreateCredentialService {
  async execute({
    email,
    photo,
    description,
    password,
    name,
    phone_number,
    rg,
    cpf,
    state,
    city,
    served_cities,
    birthday,
    services,
    profession
  }) {
    if (!email || !name) {
      throw new Error("Preencha pelo menos o nome e email para cadastrar o credenciado.");
    }

    const credentialEmail = await _prisma.default.credential.findUnique({
      where: {
        email: email
      }
    });

    if (credentialEmail) {
      throw new Error("O email digitado já está sendo usado.");
    }

    if (photo) {
      const s3Storage = new _S3Storage.default();
      const upload = await s3Storage.saveFile(photo);
      photo = upload;
    }

    if (password) {
      const passwordHash = await (0, _bcryptjs.hash)(password, 8);
      password = passwordHash;
    }

    if (email && description && photo && password && name && phone_number && rg && cpf && state && city && served_cities && birthday && services && profession) {
      const credential = await _prisma.default.credential.create({
        data: {
          email,
          password,
          name,
          phone_number,
          rg,
          cpf,
          state,
          city,
          description,
          photo,
          served_cities,
          birthday,
          services,
          profession,
          visible: true,
          enabled: true
        }
      });
      return credential;
    } else {
      const credential = await _prisma.default.credential.create({
        data: {
          email,
          password,
          name,
          phone_number,
          rg,
          cpf,
          state,
          city,
          description,
          photo,
          served_cities,
          birthday,
          services,
          profession,
          visible: true,
          enabled: false
        }
      });
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "completedCredential.hbs");

      const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

      const templateParse = _handlebars.default.compile(templateFileContent);

      const templateHTML = templateParse({
        id: credential.id,
        name: credential.name
      });
      var transport = await _nodemailer.default.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "leonardo@guruseg.com.br",
          pass: "suimoooumyjdbqct"
        }
      });
      await transport.sendMail({
        from: {
          name: "Equipe Guruseg",
          address: "leonardo@guruseg.com.br"
        },
        to: {
          name: credential.name,
          address: credential.email
        },
        subject: "[Guruseg] Seja nosso Credenciado",
        html: templateHTML
      });
      return credential;
    }
  }

}

exports.AdminCreateCredentialService = AdminCreateCredentialService;