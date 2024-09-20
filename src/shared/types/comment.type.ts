import { TUser } from './user.type.js';

export type TComment = {
  text: string;
  publishedAt: string;
  rating: number;
  user: TUser;
};
