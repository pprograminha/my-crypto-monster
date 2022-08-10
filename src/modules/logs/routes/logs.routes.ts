import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAdministrator from '../../users/middlewares/ensureAdministrator';
import { ensureAuthenticated } from '../../users/middlewares/ensureAuthenticated';
import { listLogsController } from '../useCases/listLogs';


const logsRouter = Router();

logsRouter.get(
  '/list',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.QUERY]: {
      user_id: Joi.string().uuid(),
    }
  }),
  (request, response) => listLogsController.handle(request, response),
);

export { logsRouter };