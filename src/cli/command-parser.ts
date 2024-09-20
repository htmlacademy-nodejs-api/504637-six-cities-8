type ParsedCommand = Record<string, string[]>;

export class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    const parsedCommands: ParsedCommand = {};
    let currentCommand = '';

    for (const argument of cliArguments) {
      if (argument.startsWith('--')) {
        parsedCommands[argument] = [];
        currentCommand = argument;
      } else if (currentCommand && argument) {
        parsedCommands[currentCommand].push(argument);
      }
    }

    return parsedCommands;

  }
}
