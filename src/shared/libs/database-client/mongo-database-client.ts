import { inject, injectable } from 'inversify';
import mongoose, { Mongoose } from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../logger/logger.interface.js';
import { IDatabaseClient } from './database-client.interface.js';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

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

    let attempt = 1;
    while(RETRY_COUNT > attempt) {
      try {
        this.mongoose = await mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established');
        return;
      } catch(error) {
        console.log(`Failed connect to the database, attempt ${attempt}`);
        attempt++;
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection attempts ${RETRY_COUNT}`);
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
