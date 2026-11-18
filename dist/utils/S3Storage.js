"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _mime = _interopRequireDefault(require("mime"));
var _multer = _interopRequireDefault(require("../config/multer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class S3Storage {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.default.S3({
      region: "sa-east-1"
    });
  }
  async saveFile(filename) {
    const originalPath = _path.default.resolve(_multer.default.directory, filename);
    const ContentType = _mime.default.getType(originalPath);
    if (!ContentType) {
      throw new Error("Arquivo não enviado");
    }
    const fileContent = await _fs.default.promises.readFile(originalPath);
    await this.client.putObject({
      Bucket: "guruseg-data",
      Key: filename,
      Body: fileContent,
      ContentType
    }).promise();
    await _fs.default.promises.unlink(originalPath);
    return filename;
  }
  async deleteFile(file) {
    await this.client.deleteObject({
      Bucket: "guruseg-data",
      Key: file
    }).promise();
  }
  async getTemporaryUrl(filename, expiresInMinutes = 15) {
    const url = await this.client.getSignedUrlPromise("getObject", {
      Bucket: "guruseg-data",
      Key: filename,
      Expires: expiresInMinutes * 60
    });
    return url;
  }
}
var _default = exports.default = S3Storage;