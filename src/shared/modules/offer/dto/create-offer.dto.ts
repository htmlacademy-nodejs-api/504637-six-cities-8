import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { OfferType, TOfferCoordinates } from '../../../types/index.js';

export class CreateOfferDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({message: 'Title must be a string'})
  @MinLength(10, { message: 'Minimum title length is 10' })
  @MaxLength(100, { message: 'Maximum title length is 100' })
  public title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({message: 'Description must be a string'})
  @MinLength(20, { message: 'Minimum description length is 20' })
  @MaxLength(1024, { message: 'Maximum description length is 1024' })
  public description: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({message: 'City must be a string'})
  public city: string;

  @IsNotEmpty({ message: 'Preview is required' })
  @IsString({ message: 'Preview must be a string' })
  public preview: string;

  @IsNotEmpty({ message: 'Images are required' })
  @IsArray()
  @IsString({ each: true })
  public images: string[];

  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(OfferType)
  public type: OfferType;

  @IsNotEmpty({ message: 'Rooms are required' })
  @IsNumber()
  public rooms: number;

  @IsNotEmpty({ message: 'Is premium is required' })
  @IsBoolean()
  public isPremium: boolean;

  @IsNotEmpty({ message: 'Guests are required' })
  @IsNumber()
  public guests: number;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber()
  public price: number;

  @IsNotEmpty({ message: 'Features are required' })
  @IsArray()
  @IsString({ each: true })
  public features: string[];

  @IsNotEmpty({ message: 'Coordinates are required' })
  public coordinates: TOfferCoordinates;

  @IsNotEmpty({ message: 'User is required' })
  public user: string;

  @IsNotEmpty({ message: 'Is featured is required' })
  @IsBoolean()
  public isFeatured: boolean;

  @IsOptional()
  @IsNumber()
  public comments?: number;

  @IsNotEmpty({ message: 'Rating is required' })
  @IsNumber()
  public rating: number;
}
