"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Define a tipagem para a instância da API
const api = exports.api = _axios.default.create({
  baseURL: "https://api.asaas.com/v3/",
  headers: {
    access_token: process.env.ASAAS_SECRETE_KEY
  }
});