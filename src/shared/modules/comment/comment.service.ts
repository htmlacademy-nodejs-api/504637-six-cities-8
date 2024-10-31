import { DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { IOfferService } from '../offer/offer.service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { ICommentService } from './comment.service.interface.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class CommentService implements ICommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.CommentModel) private readonly commentModel: ModelType<CommentEntity>,
    @inject(Component.OfferService) private readonly offerService: IOfferService
  ) {}

  public async findAll(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({ offerId }).exec();
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await this.offerService.incCommentCount(dto.offerId);
    this.logger.info(`New comment created for offer ${dto.offerId}`);
    return comment;
  }

  public async delete(offerId: string): Promise<number> {
    const comment = await this.commentModel.deleteMany({ offerId }).exec();
    await this.calculateRating(offerId);
    this.logger.info(`Comment deleted for offer ${offerId}`);
    return comment.deletedCount;
  }

  private async calculateRating(offerId: string): Promise<void> {
    const comments = await this.findAll(offerId);
    const rating = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
    await this.offerService.update(offerId, { rating });
  }
}
