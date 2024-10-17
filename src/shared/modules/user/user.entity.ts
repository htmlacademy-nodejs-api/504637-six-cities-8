/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/hash.js';
import { TUser, TUserType } from '../../types/index.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({schemaOptions: { collection: 'users', timestamps: true }})
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, })
  public name: string;

  @prop({ required: true, default: 'basic' })
  public userType: TUserType;

  @prop({ required: false, default: '' })
  public avatarPath?: string | undefined;

  @prop({ required: false})
  public passwordHash?: string | undefined;

  constructor(userData: TUser) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.userType = userData.userType || 'basic';
    this.avatarPath = userData.avatarPath || '';
    this.passwordHash = userData.passwordHash;
  }

  public setPassword(password: string, salt: string) {
    this.passwordHash = createSHA256(password, salt);
  }

  public getPassword() {
    return this.passwordHash;
  }

}

export const UserModel = getModelForClass(UserEntity);
