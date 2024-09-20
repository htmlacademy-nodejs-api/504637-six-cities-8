import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName() {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    console.info(`
      Cli tool for creating necessary data for the six-cities project.
      
      Usage: node cli.js --<command> [--arguments]
      
      Commands:
        --help:                           # Show this help message.
        --version:                        # Show version in package.json.
        --import <path>:                  # Import data from the .tcv file.
        --generate <n> <path> <url>:      # Generate n random data.
    `);
  }
}
