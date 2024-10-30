export type TOfferCoordinates = { latitude: number; longitude: number };

export enum OfferType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel'
}

export enum Price {
  MIN = 100,
  MAX = 100_000
}
export enum WeekDays {
  FIRST = 1,
  LAST =7
}

export type TOffer = {
  title: string;
  description: string;
  city: string;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFeatured: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  features: string[];
  user: string;
  comments: number;
  coordinates: TOfferCoordinates;
};
