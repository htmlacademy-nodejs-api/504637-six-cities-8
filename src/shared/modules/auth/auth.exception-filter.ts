import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { IExceptionFilter } from '../../libs/rest/exception-filter/index.js';
import { Component } from '../../types/component.enum.js';
import { BaseUserException } from './errors/base-user.exception.js';

@injectable()
export class AuthExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.status).json({ type: 'AUTHORIZATION', error: error.message });
  }
}
