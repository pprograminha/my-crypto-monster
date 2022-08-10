import { Router } from 'express';
import { createWeaponController } from '../useCases/createWeapon'
import { updateWeaponImageController } from '../useCases/updateWeaponImage'
import { ensureAuthenticated } from '../../users/middlewares/ensureAuthenticated';
import multer from 'multer';
import { storageConfig } from '../../../config/storage';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAdministrator from '../../users/middlewares/ensureAdministrator';
import { destroyWeaponController } from '../useCases/destroyWeapon';
import { listWeaponsController } from '../useCases/listWeapons';
import { showWeaponController } from '../useCases/showWeapon';

const weaponsRouter = Router();

const upload = multer(storageConfig.multer);

export const create_weapon_celebrate_body = {
  [Segments.BODY]: {
    name: Joi.string().required(),
  
    base_atk_physical: Joi.number().integer().required(),
    base_atk_magical: Joi.number().integer().required(),
    base_def_physical: Joi.number().integer().required(),
    base_def_magical: Joi.number().integer().required(),
    base_speed: Joi.number().integer().required(),
    base_health: Joi.number().integer().required(),
    base_crit_chance: Joi.number().integer().required(),

    character_id: Joi.string().uuid().required(),
  
    energy: Joi.number().integer().required(),
    level: Joi.number().integer().required()
  }
};

weaponsRouter.post(
  '/create',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate(create_weapon_celebrate_body),
  (request, response) => createWeaponController.handle(request, response),
);

weaponsRouter.delete(
  '/destroy',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      weapon_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => destroyWeaponController.handle(request, response),
);

weaponsRouter.get(
  '/list',
  ensureAuthenticated,
  (request, response) => listWeaponsController.handle(request, response),
);

weaponsRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      weapon_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => showWeaponController.handle(request, response),
);

weaponsRouter.patch(
  '/update-image',
  ensureAuthenticated,
  ensureAdministrator,
  upload.single('image'),
  celebrate({
    [Segments.BODY]: {
      weapon_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => updateWeaponImageController.handle(request, response),
);

export { weaponsRouter };