
export type TOfferType = 'apartment' | 'house' | 'room' | 'hotel';
export type TOfferCoordinates = { latitude: number; longitude: number };

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
