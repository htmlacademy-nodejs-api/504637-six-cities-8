import { StatusCodes } from 'http-status-codes';
import { TValidationErrorField } from '../types/index.js';
import { HttpError } from './http-error.js';

export class AppValidationError extends HttpError {
  public details: TValidationErrorField[] = [];

  constructor(message: string, errors: TValidationErrorField[]) {
    super(StatusCodes.BAD_REQUEST, message);
    this.details = errors;
  }
}
