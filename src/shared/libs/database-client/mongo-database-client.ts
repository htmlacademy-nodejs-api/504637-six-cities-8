import { inject, injectable } from 'inversify';
import { Mongoose } from 'mongoose';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../logger/logger.interface.js';
import { IDatabaseClient } from './database-client.interface.js';

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

    this.logger.info('Trying to connect to MongoDB...');

    this.mongoose = new Mongoose();
    await this.mongoose.connect(uri);
    this.isConnected = true;

    this.logger.info('Database connection established');
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
