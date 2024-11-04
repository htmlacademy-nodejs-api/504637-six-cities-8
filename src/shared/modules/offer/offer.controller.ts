import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { fillDTO } from '../../helpers/index.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { BaseController } from '../../libs/rest/controller/index.js';
import { DocumentExistsMiddleware } from '../../libs/rest/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';
import { HttpMethod } from '../../libs/rest/types/http-methods.enum.js';
import { Component } from '../../types/component.enum.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { IOfferService } from './offer.service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.findAll });
    this.addRoute({
      path: '/',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateOfferDto)],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.GET,
      handler: this.findById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ] });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.PATCH,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.DELETE,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({ path: '/premium', method: HttpMethod.GET, handler: this.findAllPremium });
    this.addRoute({ path: '/featured', method: HttpMethod.GET, handler: this.findAllFeatured });
    this.addRoute({
      path: '/:offerId/featured',
      method: HttpMethod.PATCH,
      handler: this.addToFeatured,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async findAll(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findAll();
    const resData = fillDTO(OfferRdo, offers);
    this.ok(res, resData);
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.create({...req.body, comments: 0, rating: 1 });
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const updatedOffer = await this.offerService.update(offerId, req.body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const deletedOffer = await this.offerService.delete(offerId);
    this.ok(res, fillDTO(OfferRdo, deletedOffer));
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async findAllPremium(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findAllPremiums(req.params.cityId);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async findAllFeatured(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findAllFeatured();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async addToFeatured(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const offer = await this.offerService.addToFeatured(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }
}
