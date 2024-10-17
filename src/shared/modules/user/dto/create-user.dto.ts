import { TUserType } from '../../../types/index.js';

export class CreateUserDto {
  email: string;
  name: string;
  type: TUserType;
  avatarPath?: string;
  passwordHash?: string;
}
