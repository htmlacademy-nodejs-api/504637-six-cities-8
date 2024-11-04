import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';

export interface IUserService {
  create(
    createUserDto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    createUserDto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
}
