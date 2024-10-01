import { ILogger } from '../shared/libs/logger/logger.interface.js';

export class RestApplication {
  constructor(private readonly logger: ILogger) {}

  public async init() {
    this.logger.info('Application initialized');
  }
}
