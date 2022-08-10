import { Router } from 'express';
import { createCharacterController } from '../useCases/createCharacter'
import { updateCharacterImageController } from '../useCases/updateCharacterImage'
import { ensureAuthenticated } from '../../users/middlewares/ensureAuthenticated';
import multer from 'multer';
import { storageConfig } from '../../../config/storage';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAdministrator from '../../users/middlewares/ensureAdministrator';
import { listCharactersController } from '../useCases/listCharacters';
import { destroyCharacterController } from '../useCases/destroyCharacter';
import { showCharacterController } from '../useCases/showCharacter';

const charactersRouter = Router();

const upload = multer(storageConfig.multer)

charactersRouter.get(
  '/list',
  ensureAuthenticated,
  ensureAdministrator,
  (request, response) => listCharactersController.handle(request, response),
);

charactersRouter.post(
  '/create',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      
      base_atk_physical: Joi.number().integer().required(),
      base_atk_magical: Joi.number().integer().required(),
      base_def_physical: Joi.number().integer().required(),
      base_def_magical: Joi.number().integer().required(),
      base_speed: Joi.number().integer().required(),
      base_health: Joi.number().integer().required(),
      base_crit_chance: Joi.number().integer().required(),
    
      energy: Joi.number().integer().required(),
      level: Joi.number().integer().required()
    }
  }),
  (request, response) => createCharacterController.handle(request, response),
);

charactersRouter.delete(
  '/destroy',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      character_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => destroyCharacterController.handle(request, response),
);

charactersRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      character_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => showCharacterController.handle(request, response),
);

charactersRouter.patch(
  '/update-image',
  ensureAuthenticated,
  ensureAdministrator,
  upload.single('image'),
  celebrate({
    [Segments.BODY]: {
      character_id: Joi.string().uuid().required(),
    }
  }),
  (request, response) => updateCharacterImageController.handle(request, response),
);

export { charactersRouter };