import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAdministrator from '../../users/middlewares/ensureAdministrator';
import { ensureAuthenticated } from '../../users/middlewares/ensureAuthenticated';
import { cancelSaleController } from '../useCases/cancelSale';
import { createSaleController } from '../useCases/createSale';
import { listSalesController } from '../useCases/listSales';
import { showSaleController } from '../useCases/showSale';

const salesRouter = Router();

salesRouter.post(
  '/create',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        price: Joi.number().not(0).required(),
        crypto: Joi.string().required().uppercase(),
        type: Joi.string().regex(/^(weapon|character|both)$/).required(),
        quantity: Joi.number().integer().default(0),
        common_rate: Joi.number().integer().max(100).default(0),
        rare_rate: Joi.number().integer().max(100).default(0),
        epic_rate: Joi.number().integer().max(100).default(0),
        legendary_rate: Joi.number().integer().max(100).default(0),
        super_legendary_rate: Joi.number().integer().max(100).default(0),
    }
  }),
  (request, response) => createSaleController.handle(request, response),
);

salesRouter.delete(
  '/cancel',
  ensureAuthenticated,
  ensureAuthenticated,
  (request, response) => cancelSaleController.handle(request, response),
);

salesRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      sale_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => showSaleController.handle(request, response),
);

salesRouter.get(
  '/list',
  ensureAuthenticated,
  ensureAuthenticated,
  (request, response) => listSalesController.handle(request, response),
);

export { salesRouter };
