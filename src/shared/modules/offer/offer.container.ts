import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { OfferController } from './offer.controller.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferService } from './offer.service.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(OfferService).inSingletonScope();
  offerContainer.bind<OfferController>(Component.OfferController).to(OfferController).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
