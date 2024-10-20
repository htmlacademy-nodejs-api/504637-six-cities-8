import { DocumentType } from '@typegoose/typegoose/lib/types.js';
import { OfferEntity } from './offer.entity.js';
import { IOfferService } from './offer.service.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { types } from '@typegoose/typegoose';

@injectable()
export class OfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const offer = await this.offerModel.create(createOfferDto);
    this.logger.info(`Offer created ${offer.title}`);
    return offer;
  }

  async update(id: string, updateOfferDto: Partial<CreateOfferDto>): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findOneAndUpdate({ id }, updateOfferDto).exec();
    this.logger.info(`Offer updated ${offer?.title}`);
    return offer;
  }

  async delete(id: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findOneAndDelete({ id }).exec();
    this.logger.info(`Offer deleted ${offer?.id}`);
    return offer;
  }

  async findAll(): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel.find().exec();
    this.logger.info(`Retrieved ${offers.length} offers`);
    return offers;
  }

  async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById({ id }).exec();
    return offer;
  }

  async findAllPremiums(cityId: string): Promise<DocumentType<OfferEntity>[]> {
    const premiumOffers = await this.offerModel.find({ isPremium: true, city: cityId }).exec();
    this.logger.info(`Retrieved ${premiumOffers.length} premium offers for city ${cityId}`);
    return premiumOffers;
  }

  async findAllFeatured(): Promise<DocumentType<OfferEntity>[]> {
    const featuredOffers = await this.offerModel.find({ isFeatured: true }).exec();
    this.logger.info(`Retrieved ${featuredOffers.length} featured offers`);
    return featuredOffers;
  }

  async addToFeatured(id: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findByIdAndUpdate(id, { $set: { isFeatured: true } }).exec();
    this.logger.info(`Offer ${id} added to featured`);
    return offer;
  }

  async deleteFromFeatured(id: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findOneAndDelete({ id }).exec();
    this.logger.info(`Offer ${id} deleted from featured`);
    return offer;
  }
}
