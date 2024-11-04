import { inject, injectable } from 'inversify';
import { SignJWT } from 'jose';
import crypto from 'node:crypto';
import { IConfig } from '../../libs/config/config.interface.js';
import { TRestSchema } from '../../libs/config/rest.schema.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { IUserService } from '../user/user.service.interface.js';
import { IAuthService } from './auth-service.interface.js';
import { JWT_ALGORITHM, JWT_EXPIRES_IN } from './auth.contants.js';
import { LoginDto } from './dto/login.dto.js';
import { UserNotFoundException } from './errors/user-not-found.exception.js';
import { UserPasswordIncorrectException } from './errors/user-password-incorrect.exception.js';
import { TTokenPayload } from './types/token-payload.js';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>
  ) {}

  public async authenticate (user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');

    const tokenPayload: TTokenPayload = {
      email: user.email,
      firstname: user.name,
      lastname: user.name,
      id: user.id,
    };

    this.logger.info(`Create token for ${user.email}`);

    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRES_IN)
      .sign(secretKey);
  }

  public async verify(dto: LoginDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);

    if (! user) {
      this.logger.warning(`User with email ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (! user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warning(`Password for user ${dto.email} is invalid`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
