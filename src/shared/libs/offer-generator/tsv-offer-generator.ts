import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { TMockServerData } from '../../types/mock-server-data.js';
import { IOfferGenerator } from './file-generator.interface.js';

const MIN_PRICE = 1000;
const MAX_PRICE = 10000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: TMockServerData) {}

  public generate() {
    const name = getRandomItem<string>(this.mockData.name);
    const description = getRandomItem<string>(this.mockData.description);
    const city = getRandomItem<string>(this.mockData.city);
    const preview = getRandomItem<string>(this.mockData.preview);
    const images = getRandomItems<string[]>(this.mockData.images).join(';');
    const isPremium = getRandomItem<boolean>([false, true]);
    const isFeatured = getRandomItem<boolean>([true, false]);
    const rating = generateRandomValue(1, 5, 1);
    const type = getRandomItem<string>(this.mockData.type);
    const room = getRandomItem<number>([1, 2, 3,4 , 5, 6, 7, 8, 9, 10]);
    const guests = getRandomItem<number>([1, 2, 3,4 , 5, 6, 7, 8, 9, 10]);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const items = getRandomItems<string[]>(this.mockData.items).join(';');
    const author = getRandomItem<string>(this.mockData.author);
    const comments = getRandomItem<number>([1, 2, 3,4 , 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    const coordinates = getRandomItem<number[]>(this.mockData.coordinates);

    const publishedAt = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [name, description, publishedAt, city, preview, images, isPremium, isFeatured, rating, type, room, guests, price, items, author, comments, coordinates].join('\t');
  }
}
