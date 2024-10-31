import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email is required' })
  public email: string;

  @IsNotEmpty({ message: 'Name is required' })
  public name: string;

  @IsEnum(UserType)
  public type: UserType;

  @IsOptional()
  public avatarPath?: string;

  @IsNotEmpty({ message: 'Password is required' })
  public password: string;
}
