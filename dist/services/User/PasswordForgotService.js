"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordForgotService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _path = require("path");
var _fs = _interopRequireDefault(require("fs"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _resend = require("resend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PasswordForgotService {
  async execute({
    email
  }) {
    if (!email) {
      throw new Error("Insira o email");
    }
    let user = {};
    const userC = await _prisma.default.user.findFirst({
      where: {
        email: email
      }
    });
    user = userC;
    if (!user) {
      const collaborator = await _prisma.default.collaborator.findFirst({
        where: {
          email: email
        }
      });
      if (!collaborator) {
        const credential = await _prisma.default.credential.findFirst({
          where: {
            email: email
          }
        });
        if (!credential) {
          throw new Error("Usuário não encontrado");
        }
        user = credential;
      } else {
        user = collaborator;
      }
    }
    const code = Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
    await _prisma.default.passwordForgot.create({
      data: {
        user_email: email,
        code: String(code)
      }
    });
    const path = (0, _path.resolve)(__dirname, "..", "..", "views", "forgotPassword.hbs");
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
    const templateParse = _handlebars.default.compile(templateFileContent);
    const templateHTML = templateParse({
      code,
      name: user["name"]
    });
    const resend = new _resend.Resend(process.env.RESEND_KEY);
    await resend.emails.send({
      from: "Equipe Guruseg <noreply@gurusegead.com.br>",
      to: user["email"],
      subject: "[Guruseg] Recuperação de senha",
      html: templateHTML
    });
    return;
  }
}
exports.PasswordForgotService = PasswordForgotService;