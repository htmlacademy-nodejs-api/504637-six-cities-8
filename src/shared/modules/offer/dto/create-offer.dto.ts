import { OfferType, TOfferCoordinates } from '../../../types/index.js';

export class CreateOfferDto {
  title: string;
  description: string;
  publishedAt: Date;
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
}
