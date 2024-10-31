import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { fillDTO } from '../../helpers/common.js';
import { IConfig } from '../../libs/config/config.interface.js';
import { TRestSchema } from '../../libs/config/rest.schema.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { BaseController } from '../../libs/rest/controller/index.js';
import { HttpError } from '../../libs/rest/errors/index.js';
import { Component } from '../../types/component.enum.js';
import { UserRdo } from './rdo/user.rdo.js';
import { IUserService } from './user.service.interface.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.UserService) private readonly userService: IUserService
  ) {
    super(logger);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { email, name, type, avatarPath, password } = req.body;
    const user = await this.userService.create({ email, name, type, avatarPath, password}, this.config.get('SALT'));
    this.created(res, fillDTO(UserRdo, user));
  }

  public async login(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'UserController');
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'UserController');
  }
}
