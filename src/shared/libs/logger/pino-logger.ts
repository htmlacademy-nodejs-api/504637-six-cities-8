import { resolve } from 'node:path';
import { Logger as Pino, pino, transport } from 'pino';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';
import { ILogger } from './logger.interface.js';

export class PinoLogger implements ILogger {
  logger: Pino;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const fileTransport = transport({
      targets: [
        {target: 'pino/file', options: { destination }, level: 'debug'},
        {target: 'pino/file', options: { }, level: 'info'},
      ]
    });

    this.logger = pino({}, fileTransport);
  }

  public info(msg: string, ...args: unknown[]): void {
    this.logger.info(msg, args);
  }

  public debug(msg: string, ...args: unknown[]): void {
    this.logger.debug(msg, args);
  }

  public warning(msg: string, ...args: unknown[]): void {
    this.logger.warn(msg, args);
  }

  public error(msg: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, msg, args);
  }
}
