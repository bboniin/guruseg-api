"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = isAdmin;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("./../utils/auth"));
var _prisma = _interopRequireDefault(require("../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function isAdmin(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({
      message: "Token não enviado"
    });
  }
  const [, token] = authToken.split(" ");
  try {
    const {
      sub
    } = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const admin = await _prisma.default.admin.findFirst({
      where: {
        id: sub
      }
    });
    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Rota restrita ao administrador"
    });
  }
}