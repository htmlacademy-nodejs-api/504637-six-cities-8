import { inject, injectable } from 'inversify';
import { getDatabaseUri } from '../shared/helpers/database.js';
import { IConfig } from '../shared/libs/config/config.interface.js';
import { TRestSchema } from '../shared/libs/config/rest.schema.js';
import { IDatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { ILogger } from '../shared/libs/logger/logger.interface.js';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: IDatabaseClient
  ) {}

  private async initDB() {
    const mongoUri = getDatabaseUri(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    const PORT = this.config.get('PORT');
    this.logger.info(`Application running on port: ${PORT}`);
    this.logger.info('Application initialized');

    this.logger.info('Initializing database...');
    await this.initDB();
    this.logger.info('Database initialized');
  }
}
