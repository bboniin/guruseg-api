import aws, { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";
import mime from "mime";

import multerConfig from "../config/multer";

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "sa-east-1",
    });
  }

  async saveFile(filename: string): Promise<string> {
    const originalPath = path.resolve(multerConfig.directory, filename);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error("Arquivo não enviado");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: "guruseg-data",
        Key: filename,
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return filename;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: "guruseg-data",
        Key: file,
      })
      .promise();
  }

  async getTemporaryUrl(
    filename: string,
    expiresInMinutes = 15,
  ): Promise<string> {
    const url = await this.client.getSignedUrlPromise("getObject", {
      Bucket: "guruseg-data",
      Key: filename,
      Expires: expiresInMinutes * 60,
    });
    return url;
  }
}

export default S3Storage;
