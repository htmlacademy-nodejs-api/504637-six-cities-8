import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { UserEntity, UserModel } from './user.entity.js';
import { IUserService } from './user.service.interface.js';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserController>(Component.UserController).to(UserController).inSingletonScope();
  userContainer.bind<IUserService>(Component.UserService).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
}
