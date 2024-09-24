import chalk from 'chalk';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { Command } from './command.interface.js';

type TPackageJsonConfig = {
  version: string;
};

function isPackageJsonConfig(config: unknown): config is TPackageJsonConfig {
  return typeof config === 'object' && config !== null && !Array.isArray(config) && Object.hasOwn(config, 'version');
}

export class VersionCommand implements Command {
  constructor(private readonly filePath: string = 'package.json') {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), { encoding:'utf8' });
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJsonConfig(importedContent)) {
      throw new Error('Failed to parse json file');
    }

    return importedContent.version;


  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.green(version));
    } catch (error: unknown) {
      console.log(`Failed to read version from ${this.filePath}`);
      console.log(getErrorMessage(error));
    }
  }
}
