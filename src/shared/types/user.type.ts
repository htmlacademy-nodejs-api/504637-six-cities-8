export enum UserType {
  BASIC = 'basic',
  PRO = 'pro'
}

export type TUser = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  type: UserType;
};
