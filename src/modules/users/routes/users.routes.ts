import { Router } from 'express';
import { createUserController } from '../useCases/createUser'
import { signInController } from '../useCases/signInUser';
import { showUserController } from '../useCases/showUser';
import { disableUserController } from '../useCases/disableUser';
import { updateUserController } from '../useCases/updateUser';
import { saveWalletController } from '../useCases/saveWallet';
import { celebrate, Joi, Segments } from 'celebrate'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { sendForgotPasswordEmailController } from '../useCases/sendForgotPasswordEmail';
import { resetPasswordController } from '../useCases/resetPassword';

const usersRouter = Router();

usersRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      username: Joi.string().min(2).max(100).required(),
      password: Joi.string().min(8).max(100).required(),
    }
  }),
  (request, response) => createUserController.handle(request, response),
);

usersRouter.put(
  '/update',
  ensureAuthenticated,
  (request, response) => updateUserController.handle(request, response),
);

usersRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      username: Joi.string().min(2).max(100),
    }
  }),
  (request, response) => showUserController.handle(request, response),
);

usersRouter.patch(
  '/disable',
  ensureAuthenticated,
  (request, response) => disableUserController.handle(request, response),
);

usersRouter.patch(
  '/save-wallet',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      wallet: Joi.string().required(),
    }
  }),
  (request, response) => saveWalletController.handle(request, response),
);

usersRouter.post(
  '/signin',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(100).required(),
    }
  }),
  (request, response) => signInController.handle(request, response),
);

usersRouter.post('/forgot-password', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
  }
}), (request, response) => sendForgotPasswordEmailController.handle(request, response))

usersRouter.put('/reset-password', celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().min(8).max(100).required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password'))
  }
}), (request, response) => resetPasswordController.handle(request, response))

export { usersRouter };