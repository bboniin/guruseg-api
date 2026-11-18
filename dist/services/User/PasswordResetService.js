"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordResetService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _dateFns = require("date-fns");
var _bcryptjs = require("bcryptjs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PasswordResetService {
  async execute({
    code,
    password
  }) {
    const passwordCode = await _prisma.default.passwordForgot.findFirst({
      where: {
        code: code
      }
    });
    if (!passwordCode) {
      throw new Error('Código inválido!');
    }
    const dateCreated = passwordCode.create_at;
    const dateLimit = (0, _dateFns.addHours)(dateCreated, 2);
    const isCodeExpired = (0, _dateFns.isAfter)(new Date(), dateLimit);
    if (isCodeExpired) {
      throw new Error('Código expirou!');
    }
    const user = await _prisma.default.user.findFirst({
      where: {
        email: passwordCode.user_email
      }
    });
    if (user) {
      const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
      await _prisma.default.user.update({
        where: {
          email: passwordCode.user_email
        },
        data: {
          password: hashedPassword
        }
      });
      await _prisma.default.passwordForgot.deleteMany({
        where: {
          code: code
        }
      });
      return {
        message: "Senha alterada com sucesso"
      };
    } else {
      const collaborator = await _prisma.default.collaborator.findFirst({
        where: {
          email: passwordCode.user_email
        }
      });
      if (collaborator) {
        const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
        await _prisma.default.collaborator.update({
          where: {
            email: passwordCode.user_email
          },
          data: {
            password: hashedPassword
          }
        });
        await _prisma.default.passwordForgot.deleteMany({
          where: {
            code: code
          }
        });
        return {
          message: "Senha alterada com sucesso"
        };
      } else {
        const credential = await _prisma.default.credential.findFirst({
          where: {
            email: passwordCode.user_email
          }
        });
        if (credential) {
          const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
          await _prisma.default.credential.update({
            where: {
              email: passwordCode.user_email
            },
            data: {
              password: hashedPassword
            }
          });
          await _prisma.default.passwordForgot.deleteMany({
            where: {
              code: code
            }
          });
          return {
            message: "Senha alterada com sucesso"
          };
        } else {
          throw new Error("Nenhum usuário encontrado");
        }
      }
    }
  }
}
exports.PasswordResetService = PasswordResetService;