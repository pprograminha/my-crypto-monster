import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { ChestsRepository } from '../../repositories/implementations/ChestsRepository';
import { CreateChestController } from './CreateChestController';
import { CreateChestUseCase } from './CreateChestUseCase';

const chestsRepository = new ChestsRepository();
const usersRepository = new UsersRepository();

const createChestUseCase = new CreateChestUseCase(chestsRepository, usersRepository);

const createChestController = new CreateChestController(createChestUseCase)

export {
  createChestController,
  createChestUseCase,
};
