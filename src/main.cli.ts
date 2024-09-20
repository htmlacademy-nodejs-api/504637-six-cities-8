#!/opt/homebrew/opt/nvm/versions/node/v18.20.1/bin/node
import { CliApplication, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';


function bootstrap() {
  const cliApp = new CliApplication();
  cliApp.registerCommands([ new HelpCommand(), new VersionCommand(), new ImportCommand() ]);
  cliApp.processComands(process.argv);
}

bootstrap();
