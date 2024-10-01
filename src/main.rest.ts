import { Container } from 'inversify';
import 'reflect-metadata';
import { RestApplication } from './rest/rest.application.js';
import { IConfig } from './shared/libs/config/config.interface.js';
import { RestConfig } from './shared/libs/config/rest.config.js';
import { TRestSchema } from './shared/libs/config/rest.schema.js';
import { ILogger } from './shared/libs/logger/logger.interface.js';
import { PinoLogger } from './shared/libs/logger/pino-logger.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
