import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { getDatabaseUri } from '../shared/helpers/database.js';
import { IConfig } from '../shared/libs/config/config.interface.js';
import { TRestSchema } from '../shared/libs/config/rest.schema.js';
import { IDatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { ILogger } from '../shared/libs/logger/logger.interface.js';
import { IController } from '../shared/libs/rest/controller/controller.interface.js';
import { IExceptionFilter } from '../shared/libs/rest/exception-filter/index.js';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: IDatabaseClient,
    @inject(Component.OfferController)
    private readonly offerController: IController,
    @inject(Component.CommentController)
    private readonly commentController: IController,
    @inject(Component.UserController)
    private readonly userController: IController,
    @inject(Component.ExceptionFilter)
    private readonly appExceptionFilter: IExceptionFilter
  ) {
    this.server = express();
  }

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

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
    this.server.use('/users', this.userController.router);
  }

  private async initMiddleware() {
    this.server.use(express.json());
  }

  private async initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialized');

    this.logger.info('Initializing database...');
    await this.initDB();
    this.logger.info('Database initialized');


    this.logger.info('Initializing middleware...');
    await this.initMiddleware();
    this.logger.info('Middleware initialized');


    this.logger.info('Initializing controllers...');
    await this.initControllers();
    this.logger.info('Controllers initialized');

    this.logger.info('Initializing exception filters...');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialized');

    this.logger.info('Initializing server...');
    await this.initServer();
    this.logger.info(`Server started on port: ${this.config.get('PORT')}`);
  }
}
