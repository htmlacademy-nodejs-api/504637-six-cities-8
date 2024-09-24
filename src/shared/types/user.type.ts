export type TUserType = 'basic' | 'pro';

export type TUser = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  userType: TUserType;
};
