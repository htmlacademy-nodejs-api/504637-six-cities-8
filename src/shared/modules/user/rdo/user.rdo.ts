import { Expose } from 'class-transformer';
import { UserType } from '../../../types/user.type.js';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public type: UserType;

  @Expose()
  public avatarPath: string;
}
