#!/usr/bin/env/node  -> sheband, will help with running the script without node
import { CliApplication, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';


function bootstrap() {
  const cliApp = new CliApplication();
  cliApp.registerCommands([ new HelpCommand(), new VersionCommand(), new ImportCommand() ]);
  cliApp.processComands(process.argv);
}

bootstrap();
