import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export interface ICommentService {
  findAll(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  create(offerId: string, dto: CreateCommentDto, userId: string): Promise<DocumentType<CommentEntity>>;
}
