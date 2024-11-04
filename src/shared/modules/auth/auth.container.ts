import { Container } from 'inversify';
import { IExceptionFilter } from '../../libs/rest/exception-filter/exception-filter.interface.js';
import { Component } from '../../types/component.enum.js';
import { IAuthService } from './auth-service.interface.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';
import { AuthService } from './auth.service.js';

export function createAuthContainer() {
  const authContainer = new Container();

  authContainer.bind<IAuthService>(Component.AuthService).to(AuthService).inSingletonScope();
  authContainer.bind<IExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;

}
