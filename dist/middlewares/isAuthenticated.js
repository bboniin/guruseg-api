"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("./../utils/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      message: 'Token não enviado'
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const {
      sub
    } = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    req.userId = sub;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Internal server Error'
    });
  }

  return next();
}