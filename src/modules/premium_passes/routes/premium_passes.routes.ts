import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate'
import { createPremiumPassController } from '../useCases/createPremiumPass';
import { deletePremiumPassController } from '../useCases/deletePremiumPass';
import { ensureAuthenticated } from '../../users/middlewares/ensureAuthenticated';
import ensureAdministrator from '../../users/middlewares/ensureAdministrator';
import { userHasPremiumPassController } from '../useCases/userHasPremiumPass';
import { makePremiumPassesValidController } from '../useCases/makePremiumPassesValid';

const premiumPassesRouter = Router();

premiumPassesRouter.post(
  '/create',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => createPremiumPassController.handle(request, response),
);
premiumPassesRouter.put(
  '/update-many',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      users: Joi.array().items(Joi.string().uuid().required()),
    }
  }),
  (request, response) => makePremiumPassesValidController.handle(request, response),
);

premiumPassesRouter.delete(
  '/delete',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => deletePremiumPassController.handle(request, response),
);

premiumPassesRouter.post(
  '/has',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => userHasPremiumPassController.handle(request, response),
);


export { premiumPassesRouter };