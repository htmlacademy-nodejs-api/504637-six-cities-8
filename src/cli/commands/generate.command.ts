import got from 'got';
import { appendFile } from 'node:fs/promises';
import { TSVOfferGenerator } from '../../shared/libs/index.js';
import { TMockServerData } from '../../shared/types/mock-server-data.js';
import { Command } from './command.interface.js';

export class GenerateCommand implements Command {
  private initialData: TMockServerData;

  private async load(url: string): Promise<void> {
    try {
      this.initialData = await got.get(url).json();
    } catch (error) {
      throw new Error(`Could not load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number): Promise<void> {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);

    for (let i = 0; i < offerCount; i++) {
      await appendFile(filepath, `${tsvOfferGenerator.generate()}\n`, { encoding: 'utf-8' });
    }

  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
    } catch (error) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }

    console.log(params);
  }
}
