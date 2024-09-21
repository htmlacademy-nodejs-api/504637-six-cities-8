import { readFileSync } from 'node:fs';
import { TOffer } from '../types/index.js';
import { TOfferType } from '../types/offer.type.js';
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

  private parseCSVString(str: string): string[] {
    return str.split(',');
  }

  private converStringToBoolean(str: string): boolean {
    return str === 'true';
  }

  private parseLineToOffer = (line: string): TOffer => {
    const [
      name,
      description,
      publishedAt,
      city,
      preview,
      imagesStr,
      isPremium,
      isFeatured,
      rating,
      type,
      rooms,
      guests,
      price,
      featuresStr,
      user,
      comments,
      coordinatesStr
    ] = line.split('\t');

    const coordinates = coordinatesStr.split(',').map(parseFloat);

    return {
      name,
      description,
      publishedAt: new Date(publishedAt),
      city,preview,
      images: this.parseCSVString(imagesStr),
      isPremium: this.converStringToBoolean(isPremium),
      isFeatured: this.converStringToBoolean(isFeatured),
      rating: parseFloat(rating),
      type: type as TOfferType,
      rooms: parseInt(rooms, 10),
      guests: parseInt(guests, 10),
      features: this.parseCSVString(featuresStr),
      user,
      comments: parseInt(comments, 10),
      coordinates: { latitude: coordinates[0], longitude: coordinates[1] },
      price: parseFloat(price),
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
