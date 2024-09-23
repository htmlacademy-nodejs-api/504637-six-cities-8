import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { TMockServerData } from '../../types/mock-server-data.js';
import { TOfferType } from '../../types/offer.type.js';
import { IFileGenerator } from './file-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class FileGenerator implements IFileGenerator {
  constructor(private readonly mockData: TMockServerData) {}

  public generate() {
    const categories = getRandomItems<string>(this.mockData.categories).join(';');
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const photo = getRandomItem<string>(this.mockData.offerImages);
    const author = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);

    const type = getRandomItem<TOfferType>(['rent', 'sale']);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const createdAt = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();

    return [title, description, photo, author, email, avatar, type, price, categories, createdAt].join('\t');
  }
}
