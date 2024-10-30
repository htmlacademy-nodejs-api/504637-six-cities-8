import { NextFunction, Request, Response } from 'express';

export interface IExceptionFilter {
  catch(error: unknown, req: Request, res: Response, next: NextFunction): void;
}
