import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { OfferType, TOfferCoordinates } from '../../../types/offer.type.js';

export class UpdateOfferDto {
  @IsOptional({ message: 'Title is required' })
  @IsString({message: 'Title must be a string'})
  @MinLength(10, { message: 'Minimum title length is 10' })
  @MaxLength(100, { message: 'Maximum title length is 100' })
  public title: string;

  @IsOptional({ message: 'Description is required' })
  @IsString({message: 'Description must be a string'})
  @MinLength(20, { message: 'Minimum description length is 20' })
  @MaxLength(1024, { message: 'Maximum description length is 1024' })
  public description: string;

  @IsOptional({ message: 'City is required' })
  @IsString({message: 'City must be a string'})
  public city: string;

  @IsOptional({ message: 'Preview is required' })
  @IsString({ message: 'Preview must be a string' })
  public preview: string;

  @IsOptional({ message: 'Images are required' })
  @IsArray()
  @IsString({ each: true })
  public images: string[];

  @IsOptional({ message: 'Type is required' })
  @IsEnum(OfferType)
  public type: OfferType;

  @IsOptional({ message: 'Rooms are required' })
  @IsNumber()
  public rooms: number;

  @IsOptional({ message: 'Is premium is required' })
  @IsBoolean()
  public isPremium: boolean;

  @IsOptional({ message: 'Guests are required' })
  @IsNumber()
  public guests: number;

  @IsOptional({ message: 'Price is required' })
  @IsNumber()
  public price: number;

  @IsOptional({ message: 'Features are required' })
  @IsArray()
  @IsString({ each: true })
  public features: string[];

  @IsOptional({ message: 'Coordinates are required' })
  public coordinates: TOfferCoordinates;

  @IsOptional({ message: 'Is featured is required' })
  @IsBoolean()
  public isFeatured: boolean;

  @IsOptional()
  @IsNumber()
  public comments?: number;

  @IsOptional({ message: 'Rating is required' })
  @IsNumber()
  public rating: number;
}
