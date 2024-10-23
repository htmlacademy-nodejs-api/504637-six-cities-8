import { inject, injectable } from 'inversify';
import mongoose, { Mongoose } from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { getErrorMessage } from '../../helpers/common.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../logger/logger.interface.js';
import { IDatabaseClient } from './database-client.interface.js';

enum DatabaseConnection {
  RETRY_COUNT = 5,
  RETRY_TIMEOUT = 1000,
}


@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose: Mongoose;
  private isConnected: boolean;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.isConnected = false;
  }

  public isConnectedToDB() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDB()) {
      throw new Error('MongoDB already connected');
    }

    this.logger.info('Trying to connect to database...');

    let attempt = 1;
    while(DatabaseConnection.RETRY_COUNT > attempt) {
      try {
        this.mongoose = await mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established');
        return;
      } catch(error) {
        this.logger.error(`Failed connect to database, attempt ${attempt}`,new Error(`Filed to connect to database! ${getErrorMessage(error)}`));
        this.logger.info('Trying to reconnect...');
        attempt++;
        await setTimeout(DatabaseConnection.RETRY_TIMEOUT);
      }
    }

    const errorMsg = `Unable to establish database connection, attempts ${DatabaseConnection.RETRY_COUNT}`;
    this.logger.error(errorMsg, new Error(errorMsg));
    throw new Error(errorMsg);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDB()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect();
    this.isConnected = false;
    this.logger.info('Database connection closed');

  }
}
