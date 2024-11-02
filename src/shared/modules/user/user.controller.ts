import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { fillDTO } from '../../helpers/common.js';
import { IConfig } from '../../libs/config/config.interface.js';
import { TRestSchema } from '../../libs/config/rest.schema.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { BaseController } from '../../libs/rest/controller/index.js';
import { HttpError } from '../../libs/rest/errors/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { UploadFileMiddleware } from '../../libs/rest/middleware/upload-file.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';
import { Component } from '../../types/component.enum.js';
import { CreateUserDto } from './dto/create-user.dto.js';
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

    this.logger.info('Register routes for UserController');

    this.addRoute({ path: '/', method: HttpMethod.POST, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateUserDto)] });
    this.addRoute({ path: '/login', method: HttpMethod.POST, handler: this.login });
    this.addRoute({ path: '/logout', method: HttpMethod.DELETE, handler: this.logout });
    this.addRoute({ path: '/:userId/avatar', method: HttpMethod.POST, handler: this.uploadAvatar, middlewares: [
      new ValidateObjectIdMiddleware('userId'),
      new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar')
    ] });
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { email, name, type, avatarPath, password } = req.body;
    const user = await this.userService.create({ email, name, type, avatarPath, password }, this.config.get('SALT'));
    this.created(res, fillDTO(UserRdo, user));
  }

  public async login(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'UserController');
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'UserController');
  }

  public async uploadAvatar(req: Request, res: Response): Promise<void> {
    console.log(req.file?.path);

    this.created(res, { filePath: req.file?.path, userId: req.params.userId });
  }
}
