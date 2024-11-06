import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { TTokenPayload } from '../../../modules/auth/types/token-payload.js';
import { HttpError } from '../errors/http-error.js';
import { IMiddleware } from './middleware.interface.js';

function isTokenPayload(payload: unknown): payload is TTokenPayload {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('email' in payload && typeof payload.email === 'string') &&
    ('firstname' in payload && typeof payload.firstname === 'string') &&
    ('lastname' in payload && typeof payload.lastname === 'string') &&
    ('id' in payload && typeof payload.id === 'string')
  );
}

export class ParseTokenMiddleware implements IMiddleware {
  constructor(private readonly jwtSecret: string) {}

  async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization;
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader.split(' ');

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));

      if (isTokenPayload(payload)) {
        req.tokenPayload = { ...payload };
        return next();
      } else {
        throw new Error('Invalid token payload');
      }
    } catch (error) {
      return next(new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid token', 'ParseTokenMiddleware'));
    }

  }
}
