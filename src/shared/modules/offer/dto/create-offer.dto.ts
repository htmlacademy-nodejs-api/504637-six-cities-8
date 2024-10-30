import { OfferType, TOfferCoordinates } from '../../../types/index.js';

export class CreateOfferDto {
  title: string;
  description: string;
  city: string;
  images: string[];
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  features: string[];
  coordinates: TOfferCoordinates;
  user: string;
  isPremium: boolean;
  isFeatured: boolean;
  preview: string;
  comments: number;
  rating: number;
}
