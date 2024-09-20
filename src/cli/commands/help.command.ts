import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName() {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    console.info(`
      ${chalk.bold('Cli tool for creating necessary data for the six-cities project.')}
      
      Usage: ${chalk.green('node cli.js')} ${chalk.yellow('--<command>')} ${chalk.gray('[--arguments]')}
      
      Commands:
        ${chalk.yellow('--help:')}                          # Show this help message.
        ${chalk.yellow('--version:')}                       # Show version in package.json.
        ${chalk.yellow('--import <path>:')}                 # Import data from the .tcv file.
        ${chalk.yellow('--generate <n> <path> <url>:')}     # Generate n random data.
    `);
  }
}
