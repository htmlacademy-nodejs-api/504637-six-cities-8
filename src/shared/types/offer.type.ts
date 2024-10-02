
export type TOfferType = 'apartment' | 'house' | 'room' | 'hotel';
export type TOfferCoordinates = { latitude: number; longitude: number };

export enum Price {
  MIN = 1000,
   MAX = 10000
}
export enum WeekDays {
  FIRST = 1,
  LAST =7
}

export type TOffer = {
  name: string;
  description: string;
  publishedAt: Date;
  city: string;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFeatured: boolean;
  rating: number;
  type: TOfferType,
  rooms: number;
  guests: number;
  price: number;
  features: string[];
  user: string; // should be TUser
  comments: number;
  coordinates: TOfferCoordinates;
};
