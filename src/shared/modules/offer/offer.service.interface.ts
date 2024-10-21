import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

export interface IOfferService {
  create(createOfferDto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  update(id: string, updateOfferDto: Partial<CreateOfferDto>): Promise<DocumentType<OfferEntity> | null>;
  delete(id: string): Promise<DocumentType<OfferEntity> | null>;
  findAll(): Promise<DocumentType<OfferEntity>[]>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  findAllPremiums(cityId: string): Promise<DocumentType<OfferEntity>[]>;
  findAllFeatured(): Promise<DocumentType<OfferEntity>[]>;
  addToFeatured(id: string): Promise<DocumentType<OfferEntity> | null>;
  deleteFromFeatured(id: string): Promise<DocumentType<OfferEntity> | null>;
}
