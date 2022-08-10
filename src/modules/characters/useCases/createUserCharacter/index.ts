import { UserCharactersRepository } from '../../repositories/implementations/UserCharactersRepository';
import { CreateUserCharacterController } from './CreateUserCharacterController';
import { CreateUserCharacterUseCase } from './CreateUserCharacterUseCase';

const userCharactersRepository = new UserCharactersRepository();

const createUserCharacterUseCase = new CreateUserCharacterUseCase(userCharactersRepository);

const createUserCharacterController = new CreateUserCharacterController(createUserCharacterUseCase)

export {
  createUserCharacterController,
  createUserCharacterUseCase,
};
