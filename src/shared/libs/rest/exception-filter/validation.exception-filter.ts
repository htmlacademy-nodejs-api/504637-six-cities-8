import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { createErrorObject } from '../../../helpers/common.js';
import { Component } from '../../../types/component.enum.js';
import { ILogger } from '../../logger/logger.interface.js';
import { ApplicationError } from '../types/application-error.enum.js';
import { IExceptionFilter } from './exception-filter.interface.js';

@injectable()
export class ValidationExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('ValidationExceptionFilter initialized');
  }

  catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error?.message}`, error);

    error?.details?.forEach((err) => {
      this.logger.warning(`[${err.property}] - ${err.messages}`);
    });

    res.status(StatusCodes.BAD_REQUEST).json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
