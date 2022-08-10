import { Router } from 'express';
import { createUserWeaponController } from '../useCases/createUserWeapon'
import { ensureAuthenticated } from '../../users/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { listUserWeaponsController } from '../useCases/listUserWeapons';

const userWeaponRouter = Router();

userWeaponRouter.post(
  '/create',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        rarity: Joi.string().regex(/^(common|rare|epic|legendary|superlegendary)$/).required(),
        type: Joi.string().required(),
      
        actual_atk_physical:  Joi.number().integer().required(),
        actual_atk_magical: Joi.number().integer().required(),
        actual_def_physical: Joi.number().integer().required(),
        actual_def_magical: Joi.number().integer().required(),
        actual_speed: Joi.number().integer().required(),
        actual_health: Joi.number().integer().required(),
        actual_crit_chance: Joi.number().integer().required(),
        character_id: Joi.string().uuid().required(),
      
        energy: Joi.number().integer().required(),
        level: Joi.number().integer().required()
      }
    }
  ),
  (request, response) => createUserWeaponController.handle(request, response),
);

userWeaponRouter.get(
  '/list',
  ensureAuthenticated,
  (request, response) => listUserWeaponsController.handle(request, response),
);

export { userWeaponRouter };