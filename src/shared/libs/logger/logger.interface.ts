export interface ILogger {
  info(msg: string, ...args: unknown[]): void;
  debug(msg: string, ...args: unknown[]): void;
  warning(msg: string, ...args: unknown[]): void;
  error(msg: string, error: Error, ...args: unknown[]): void;
}
