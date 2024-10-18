import { OfferType, TOffer, TOfferCoordinates } from '../../types/offer.type.js';

export class OfferEntity implements TOffer {
  name: string;
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
