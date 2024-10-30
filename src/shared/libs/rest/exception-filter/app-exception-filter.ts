import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { createErrorObject } from '../../../helpers/common.js';
import { Component } from '../../../types/component.enum.js';
import { ILogger } from '../../logger/logger.interface.js';
import { HttpError } from '../errors/http-error.js';
import { IExceptionFilter } from './exception-filter.interface.js';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('AppExceptionFilter initialized');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res.status(error.status).json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorObject(error.message));
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, _req, res, _next);
    }

    this.handleOtherError(error, _req, res, _next);
  }
}
