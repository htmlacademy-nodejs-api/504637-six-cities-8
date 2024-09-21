export type TUser = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  userType: 'basic' | 'pro';
};
