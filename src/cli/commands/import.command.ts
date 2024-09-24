import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVFileReader } from '../../shared/libs/index.js';
import { TOffer } from '../../shared/types/offer.type.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportOffer(offer: TOffer): void {
    console.log(offer);
  }

  private onCompleteImport(count: number) {
    console.log(`${count} rows imported.`);
  }

  public async execute(...params: string[]): Promise<void> {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.addListener('line', this.onImportOffer);
    fileReader.addListener('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.log(`Could not read file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
