"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthUserService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _bcryptjs = require("bcryptjs");
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("./../../utils/auth"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AuthUserService {
  async execute({
    email,
    password
  }) {
    const user = await _prisma.default.user.findFirst({
      where: {
        email: email,
        visible: true
      }
    });
    const admin = await _prisma.default.admin.findFirst({
      where: {
        email: email
      }
    });
    const collaborator = await _prisma.default.collaborator.findFirst({
      where: {
        email: email,
        visible: true
      }
    });
    const attendant = await _prisma.default.attendant.findFirst({
      where: {
        email: email,
        visible: true
      }
    });
    const associate = await _prisma.default.associate.findFirst({
      where: {
        email: email,
        visible: true
      }
    });
    if (!user && !collaborator && !admin && !attendant && !associate) {
      throw new Error("Email e Senha não correspondem ou não existe.");
    }
    const s3Storage = new _S3Storage.default();
    if (user) {
      const passwordMatch = await (0, _bcryptjs.compare)(password, user.password);
      const token = (0, _jsonwebtoken.sign)({
        name: user.name,
        email: user.email
      }, _auth.default.jwt.secret, {
        subject: user.id,
        expiresIn: "365d"
      });
      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }
      const photo_url = user.photo ? await s3Storage.getTemporaryUrl(user.photo, 245) : "";
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
          category: user.category
        },
        token
      };
    }
    if (collaborator) {
      const passwordMatch = await (0, _bcryptjs.compare)(password, collaborator.password);
      const token = (0, _jsonwebtoken.sign)({
        name: collaborator.name,
        email: collaborator.email
      }, _auth.default.jwt.secret, {
        subject: collaborator.id,
        expiresIn: "365d"
      });
      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }
      const photo_url = collaborator.photo ? await s3Storage.getTemporaryUrl(collaborator.photo, 245) : "";
      return {
        user: {
          id: collaborator.id,
          name: collaborator.name,
          email: collaborator.email,
          type: collaborator.type,
          photo: collaborator.photo,
          photo_url: photo_url,
          phone_number: collaborator.phone_number
        },
        token
      };
    }
    if (admin) {
      const passwordMatch = await (0, _bcryptjs.compare)(password, admin.password);
      const token = (0, _jsonwebtoken.sign)({
        email: admin.email
      }, _auth.default.jwt.secret, {
        subject: admin.id,
        expiresIn: "365d"
      });
      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }
      const photo_url = admin.photo ? await s3Storage.getTemporaryUrl(admin.photo, 245) : "";
      return {
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          photo: admin.photo,
          photo_url: photo_url,
          access_granted: admin.access_granted,
          type: admin.type
        },
        token
      };
    }
    if (attendant) {
      const passwordMatch = await (0, _bcryptjs.compare)(password, attendant.password);
      const token = (0, _jsonwebtoken.sign)({
        email: attendant.email
      }, _auth.default.jwt.secret, {
        subject: attendant.id,
        expiresIn: "365d"
      });
      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }
      const photo_url = attendant.photo ? await s3Storage.getTemporaryUrl(attendant.photo, 245) : "";
      return {
        user: {
          id: attendant.id,
          email: attendant.email,
          name: attendant.name,
          photo: attendant.photo,
          enabled: attendant.enabled,
          photo_url: photo_url,
          type: attendant.type
        },
        token
      };
    }
    if (associate) {
      const passwordMatch = await (0, _bcryptjs.compare)(password, associate.password);
      const token = (0, _jsonwebtoken.sign)({
        email: associate.email
      }, _auth.default.jwt.secret, {
        subject: associate.id,
        expiresIn: "365d"
      });
      if (!passwordMatch) {
        throw new Error("Email e Senha não correspondem ou não existe.");
      }
      const photo_url = associate.photo ? await s3Storage.getTemporaryUrl(associate.photo, 245) : "";
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
          key_pix: associate.key_pix
        },
        token
      };
    }
  }
}
exports.AuthUserService = AuthUserService;