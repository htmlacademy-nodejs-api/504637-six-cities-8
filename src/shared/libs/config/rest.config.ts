import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../logger/logger.interface.js';
import { IConfig } from './config.interface.js';
import { configRestSchema, TRestSchema } from './rest.schema.js';

@injectable()
export class RestConfig implements IConfig<TRestSchema> {
  private readonly config: TRestSchema;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Couldn\'t read .env file, please make sure .env that file exist');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file parsed');
  }

  public get<T extends keyof TRestSchema>(key: T): TRestSchema[T] {
    return this.config[key];
  }
}
