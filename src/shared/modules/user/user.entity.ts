/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/hash.js';
import { emailValidator } from '../../helpers/validators.js';
import { TUser, UserType } from '../../types/index.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true }})
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  @prop({ required: true, minlength: 1, maxlength: 15 })
  public name: string;

  @prop({
    required: true,
    unique: true,
    validate: { validator: emailValidator, message: 'Invalid email format' }
  })
  public email: string;

  @prop({ required: true, default: UserType.BASIC })
  public type: UserType;

  @prop({ required: true, minlength: 6, maxlength: 12 })
  public password: string;

  @prop({ required: false, default: '' })
  public avatar?: string | undefined;

  constructor(userData: TUser) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.type = userData.type || UserType.BASIC;
    this.avatar = userData.avatar || '';
    this.password = userData.password;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

}

export const UserModel = getModelForClass(UserEntity);
