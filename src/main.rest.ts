import { Container } from 'inversify';
import 'reflect-metadata';
import { RestApplication } from './rest/rest.application.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createCommentContainer } from './shared/modules/comment/comment.container.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { Component } from './shared/types/index.js';
import { createAuthContainer } from './shared/modules/auth/auth.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer()
  );

  const application = appContainer.get<RestApplication>(
    Component.RestApplication
  );

  await application.init();
}

bootstrap();
