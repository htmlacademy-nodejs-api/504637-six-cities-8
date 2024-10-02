import { CommandParser } from './command-parser.js';
import { Command } from './commands/command.interface.js';

type CommandCollection = Record<string, Command>;

export class CliApplication {
  private commands: CommandCollection = {};

  constructor(private readonly defaultCommand: string = '--help') {}

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} already registered.`);
      }

      this.commands[command.getName()] = command;
    });
  }

  public getCommand(name: string): Command {
    return this.commands[name] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command ${this.defaultCommand} is not registered.`);
    }

    return this.commands[this.defaultCommand];
  }

  public processComands(args: string[]): void {
    const parsedCommands = CommandParser.parse(args);
    const [commandName] = Object.keys(parsedCommands);
    const command = this.getCommand(commandName);
    const commandArgs = parsedCommands[commandName] ?? [];
    command.execute(...commandArgs);
  }
}
