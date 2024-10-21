import { OfferEntity, OfferModel } from './offer.entity.js';
import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer.service.js';
import { types } from '@typegoose/typegoose';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(OfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
