import { Container } from 'inversify';
import { IConfig } from '../shared/libs/config/config.interface.js';
import { RestConfig } from '../shared/libs/config/rest.config.js';
import { TRestSchema } from '../shared/libs/config/rest.schema.js';
import { IDatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../shared/libs/database-client/mongo-database-client.js';
import { ILogger } from '../shared/libs/logger/logger.interface.js';
import { PinoLogger } from '../shared/libs/logger/pino-logger.js';
import { IExceptionFilter } from '../shared/libs/rest/exception-filter/exception-filter.interface.js';
import { HttpErrorExceptionFilter } from '../shared/libs/rest/exception-filter/http-error.exception-filter.js';
import { AppExceptionFilter, ValidationExceptionFilter } from '../shared/libs/rest/exception-filter/index.js';
import { AuthExceptionFilter } from '../shared/modules/auth/auth.exception-filter.js';
import { Component } from '../shared/types/component.enum.js';
import { RestApplication } from './rest.application.js';

export function createRestApplicationContainer() {
  const restContainer = new Container();

  restContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restContainer.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restContainer.bind<IConfig<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restContainer.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restContainer.bind<IExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restContainer.bind<IExceptionFilter>(Component.HttpErrorExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restContainer.bind<IExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restContainer.bind<IExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return restContainer;
}
