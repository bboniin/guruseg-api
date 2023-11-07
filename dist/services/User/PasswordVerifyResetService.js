"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordVerifyResetService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PasswordVerifyResetService {
  async execute({
    code
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

    let user = {};
    const userC = await _prisma.default.user.findFirst({
      where: {
        email: passwordCode.user_email
      }
    });
    user = userC;

    if (!user) {
      const collaborator = await _prisma.default.collaborator.findFirst({
        where: {
          email: passwordCode.user_email
        }
      });

      if (!collaborator) {
        const credential = await _prisma.default.credential.findFirst({
          where: {
            email: passwordCode.user_email
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

    return user;
  }

}

exports.PasswordVerifyResetService = PasswordVerifyResetService;