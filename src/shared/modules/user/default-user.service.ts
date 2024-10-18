import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import { IUserService } from './user.service.interface.js';

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ){}

  public async create(createUserDto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(createUserDto);
    user.setPassword(createUserDto.password, salt);

    const newUser = await this.userModel.create(user);
    this.logger.info('New user created');
    return newUser;
  }

  findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  async findOrCreate(createUserDto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(createUserDto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(createUserDto, salt);
  }

}
