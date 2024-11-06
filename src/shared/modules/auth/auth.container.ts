import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { IAuthService } from './auth-service.interface.js';
import { AuthService } from './auth.service.js';

export function createAuthContainer() {
  const authContainer = new Container();

  authContainer.bind<IAuthService>(Component.AuthService).to(AuthService).inSingletonScope();

  return authContainer;

}
