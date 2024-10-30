import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { CommentController } from './comment.controller.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { ICommentService } from './comment.service.interface.js';
import { CommentService } from './comment.service.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentController>(Component.CommentController).to(CommentController).inSingletonScope();
  commentContainer.bind<ICommentService>(Component.CommentService).to(CommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
