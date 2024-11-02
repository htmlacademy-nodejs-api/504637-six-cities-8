import { DocumentType } from '@typegoose/typegoose';
import { IDocumentExists } from '../../types/document-exists.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface IOfferService extends IDocumentExists {
  create(createOfferDto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  update(id: string, updateOfferDto: Partial<DocumentType<OfferEntity>>): Promise<DocumentType<OfferEntity> | null>;
  delete(id: string): Promise<DocumentType<OfferEntity> | null>;
  findAll(): Promise<DocumentType<OfferEntity>[]>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  findAllPremiums(cityId: string): Promise<DocumentType<OfferEntity>[]>;
  findAllFeatured(): Promise<DocumentType<OfferEntity>[]>;
  addToFeatured(id: string): Promise<DocumentType<OfferEntity> | null>;
  deleteFromFeatured(id: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(id: string): Promise<DocumentType<OfferEntity> | null>;
  findByTitle(title: string): Promise<DocumentType<OfferEntity> | null>;
}
