/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { OfferType, TOffer, TOfferCoordinates } from '../../types/offer.type.js';
import { UserEntity } from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'offers', timestamps: true }})
export class OfferEntity extends defaultClasses.TimeStamps implements TOffer {
  @prop({ required: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true })
  public publishedAt: Date;

  @prop({ required: true })
  public city: string;

  @prop({ required: true })
  public preview: string;

  @prop({ required: true })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFeatured: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true, type: () => String, enum: OfferType })
  public type: OfferType;

  @prop({ required: true, min: 1, max: 8 })
  public rooms: number;

  @prop({ required: true, min: 1, max: 10 })
  public guests: number;

  @prop({ required: true, min: 100, max: 100_000 })
  public price: number;

  features: string[];
  @prop({ required: true, type: () => String, ref: UserEntity })
  public user: string;

  @prop({ required: true })
  public comments: number;

  @prop({ required: true })
  public coordinates: TOfferCoordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
