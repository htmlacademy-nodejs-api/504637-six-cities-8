import { HttpError } from '../../../libs/rest/errors/index.js';

export class BaseUserException extends HttpError {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}
