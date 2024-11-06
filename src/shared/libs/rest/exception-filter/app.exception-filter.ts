import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { createErrorObject } from '../../../helpers/common.js';
import { Component } from '../../../types/component.enum.js';
import { ILogger } from '../../logger/logger.interface.js';
import { ApplicationError } from '../types/application-error.enum.js';
import { IExceptionFilter } from './exception-filter.interface.js';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('AppExceptionFilter initialized');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
