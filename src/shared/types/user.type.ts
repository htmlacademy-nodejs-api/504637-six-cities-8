export type TUserType = 'basic' | 'pro';

export type TUser = {
  name: string;
  email: string;
  passwordHash?: string;
  avatarPath?: string;
  userType: TUserType;
};
