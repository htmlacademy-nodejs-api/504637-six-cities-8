import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { fillDTO } from '../../helpers/common.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { BaseController } from '../../libs/rest/controller/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';
import { Component } from '../../types/component.enum.js';
import { ICommentService } from './comment.service.interface.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentRdo } from './rdo/comment.rdo.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: ILogger,
    @inject(Component.CommentService) private readonly commentService: ICommentService
  ) {
    super(logger);

    this.addRoute({ path: '/:offerId', method: HttpMethod.GET, handler: this.findAll, middlewares: [new ValidateObjectIdMiddleware('offerId')] });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(CreateCommentDto)]
    });
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const comments = await this.commentService.findAll(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create(req: Request, res: Response): Promise<void> {
    const comment = await this.commentService.create(req.body);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
