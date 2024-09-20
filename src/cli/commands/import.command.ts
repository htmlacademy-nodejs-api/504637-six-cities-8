import { TSVFileReader } from '../../shared/libs/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...params: string[]): Promise<void> {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename.trim());

    try{
      fileReader.read();
      console.log(fileReader.toArray());
    }catch(e){
      console.error(e);
    }
  }
}
