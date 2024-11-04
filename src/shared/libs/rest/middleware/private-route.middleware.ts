import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/http-error.js';
import { IMiddleware } from './middleware.interface.js';

export class PrivateRouteMiddleware implements IMiddleware {
  execute({ tokenPayload }: Request, _res: Response, next: NextFunction): void {
    if (!tokenPayload) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'PrivateRouteMiddleware');
    }

    next();
  }
}
