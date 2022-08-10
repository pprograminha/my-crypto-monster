import { Router } from 'express';
import { createCharacterController } from '../useCases/createCharacter'
import { ensureAuthenticated } from '../../users/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { listUserCharactersController } from '../useCases/listUserCharacters';

const userCharacterRouter = Router();

userCharacterRouter.get(
  '/list',
  ensureAuthenticated,
  (request, response) => listUserCharactersController.handle(request, response),
);

userCharacterRouter.post(
  '/add-user',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      rarity: Joi.string().regex(/^(common|rare|epic|legendary|superlegendary)$/).required(),
    
      actual_atk_physical:  Joi.number().integer().required(),
      actual_atk_magical: Joi.number().integer().required(),
      actual_def_physical: Joi.number().integer().required(),
      actual_def_magical: Joi.number().integer().required(),
      actual_speed: Joi.number().integer().required(),
      actual_health: Joi.number().integer().required(),
      actual_crit_chance: Joi.number().integer().required(),
    
      energy: Joi.number().integer().required(),
      level: Joi.number().integer().required()
    }
  }),
  (request, response) => createCharacterController.handle(request, response),
);

export { userCharacterRouter };