import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAdministrator from '../../users/middlewares/ensureAdministrator';
import { ensureAuthenticated } from '../../users/middlewares/ensureAuthenticated';
import { buyChestController } from '../useCases/buyChest';
import { createChestController } from '../useCases/createChest';
import { listChestsController } from '../useCases/listChests';
import { openChestController } from '../useCases/openChest';
import { removeChestController } from '../useCases/removeChest';
import { showChestController } from '../useCases/showChest';

const chestsRouter = Router();

chestsRouter.post(
  '/create',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      rarity: Joi.string().regex(/^(common|rare|epic|legendary|superlegendary)$/).required(),
      type: Joi.string().regex(/^(weapon|character)$/).required(),
      influencer:  Joi.boolean().default(true),
      user_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => createChestController.handle(request, response),
);
chestsRouter.post(
  '/open',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      chest_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => openChestController.handle(request, response),
);

chestsRouter.post(
  '/buy',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      sale_id: Joi.string().uuid().required(),
      tx_hash: Joi.string().required(),
    }
  }),
  (request, response) => buyChestController.handle(request, response),
);

chestsRouter.get(
  '/list',
  ensureAuthenticated,
  ensureAdministrator,
  (request, response) => listChestsController.handle(request, response),
);

chestsRouter.delete(
  '/remove',
  ensureAuthenticated,
  ensureAdministrator,
  (request, response) => removeChestController.handle(request, response),
);

chestsRouter.get(
  '/show',
  ensureAuthenticated,
  (request, response) => showChestController.handle(request, response),
);

chestsRouter.get(
  '/list-my-chests',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      me: Joi.boolean().truthy().required(),
    }
  }),
  (request, response) => listChestsController.handle(request, response),
);

export { chestsRouter };
