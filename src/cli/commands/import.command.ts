import { getErrorMessage } from '../../shared/helpers/common.js';
import { getDatabaseUri } from '../../shared/helpers/database.js';
import { IDatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo-database-client.js';
import { TSVFileReader } from '../../shared/libs/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { ILogger } from '../../shared/libs/logger/logger.interface.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { OfferService } from '../../shared/modules/offer/offer.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { UserService } from '../../shared/modules/user/user.service.js';
import { TOffer } from '../../shared/types/offer.type.js';
import { UserType } from '../../shared/types/user.type.js';
import { USER_PASSWORD } from './command.constants.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  private logger: ILogger;
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: IDatabaseClient;
  private salt: string;

  constructor() {
    this.onImportOffer = this.onImportOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new UserService(this.logger, UserModel);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
    this.salt = '';
  }

  public getName(): string {
    return '--import';
  }

  private async onImportOffer(offer: TOffer, resolve: () => void): Promise<void> {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: TOffer) {
    const newUser = await this.userService.findOrCreate({
      email: 'test@gmail.com',
      name: offer.user,
      type: UserType.BASIC,
      password: USER_PASSWORD
    }, this.salt);

    await this.offerService.create({ ...offer, user: newUser.id, });
  }

  private onCompleteImport(count: number) {
    console.log(`${count} rows imported.`);
  }

  public async execute(...params: string[]): Promise<void> {
    const [filename, username, password, host, port, databaseName, salt] = params;

    const uri = getDatabaseUri(username, password, host, Number(port), databaseName);
    this.salt = salt;

    await this.databaseClient.connect(uri);

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
