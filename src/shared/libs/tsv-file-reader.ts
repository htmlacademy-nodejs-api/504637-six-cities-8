import { readFileSync } from 'node:fs';
import { TOffer } from '../types/index.js';
import { IFileReader } from './file-reader.interface.js';

export class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  private parseCategories(categoriesStr: string): {name: string}[] {
    return categoriesStr.split(',').map((category) => ({name:category.trim()}));
  }

  private parseLineToOffer = (line: string): TOffer => {
    const [id, name, description, price, image, categoriesStr] = line.split('\t');

    return {
      id,
      name,
      description,
      price: parseFloat(price),
      image,
      categories: this.parseCategories(categoriesStr),
    };
  };

  private parseRawDataToOffers() {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  public toArray(): TOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
