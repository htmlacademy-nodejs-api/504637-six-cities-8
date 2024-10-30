import { Expose } from 'class-transformer';
import { OfferType, TOfferCoordinates } from '../../../types/offer.type.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFeatured: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public features: string[];

  @Expose()
  public user: string;

  @Expose()
  public comments: number;

  @Expose()
  public coordinates: TOfferCoordinates;
}
