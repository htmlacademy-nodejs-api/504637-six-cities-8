import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { createErrorObject } from '../../../helpers/common.js';
import { Component } from '../../../types/component.enum.js';
import { ILogger } from '../../logger/logger.interface.js';
import { HttpError } from '../errors/http-error.js';
import { ApplicationError } from '../types/application-error.enum.js';
import { IExceptionFilter } from './exception-filter.interface.js';

@injectable()
export class HttpErrorExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('HttpErrorExceptionFilter initialized');
  }

  catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${error.message} # ${error.message}`, error);
    res.status(StatusCodes.BAD_REQUEST).json(createErrorObject(ApplicationError.CommonError, error.message));
  }
}
