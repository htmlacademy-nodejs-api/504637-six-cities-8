import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  email: string;
  name: string;
  type: UserType;
  avatarPath?: string;
  password: string;
}
