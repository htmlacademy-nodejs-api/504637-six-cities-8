import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { TOffer } from '../../types/index.js';
import { TOfferType } from '../../types/offer.type.js';
import { IFileReader } from './file-reader.interface.js';

export class TSVFileReader extends EventEmitter implements IFileReader {
  private CHUNK_SIZE = 16 * 1024; // 16KB

  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
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


}
