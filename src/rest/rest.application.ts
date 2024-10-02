import { inject, injectable } from 'inversify';
import { IConfig } from '../shared/libs/config/config.interface.js';
import { TRestSchema } from '../shared/libs/config/rest.schema.js';
import { ILogger } from '../shared/libs/logger/logger.interface.js';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>
  ) {}

  public async init() {
    const PORT = this.config.get('PORT');
    this.logger.info(`Application running on port: ${PORT}`);
    this.logger.info('Application initialized');
  }
}
