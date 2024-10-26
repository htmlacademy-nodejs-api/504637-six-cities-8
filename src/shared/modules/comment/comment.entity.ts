/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { TComment } from '../../types/comment.type.js';
import { UserEntity } from '../user/user.entity.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'comments', timestamps: true }})
export class CommentEntity extends defaultClasses.TimeStamps implements TComment {
  @prop({ required: true, minlength: 5, maxlength: 1024 })
  public text: string;

  @prop({ required: true, type: Date })
  public publishedAt: Date;

  @prop({ required: true, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true, type: () => String, ref: UserEntity })
  public user: string;
}

export const CommentModel = getModelForClass(CommentEntity);
