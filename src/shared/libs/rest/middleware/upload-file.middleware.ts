import { NextFunction, Request, Response } from 'express';
import { extension } from 'mime-types';
import multer from 'multer';
import crypto from 'node:crypto';
import { IMiddleware } from './middleware.interface.js';
export class UploadFileMiddleware implements IMiddleware {
  constructor(
    private readonly uploadDirectory: string,
    private readonly fieldName: string
  ) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    const storage = multer.diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtension = extension(file.mimetype);
        const filename = crypto.randomUUID();
        console.log(filename, fileExtension);
        console.log(this.uploadDirectory);

        callback(null, `${filename}.${fileExtension}`);
      },
    });

    const uploadFile = multer({ storage }).single(this.fieldName);
    uploadFile(req, res, next);
  }
}
