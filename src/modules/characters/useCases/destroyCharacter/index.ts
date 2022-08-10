import { CharactersRepository } from '../../repositories/implementations/CharactersRepository';
import { UserCharactersRepository } from '../../repositories/implementations/UserCharactersRepository';
import { DestroyCharacterController } from './DestroyCharacterController';
import { DestroyCharacterUseCase } from './DestroyCharacterUseCase';

const charactersRepository = new CharactersRepository();
const userCharactersRepository = new UserCharactersRepository();

const destroyCharacterUseCase = new DestroyCharacterUseCase(charactersRepository, userCharactersRepository);

const destroyCharacterController = new DestroyCharacterController(destroyCharacterUseCase)

export {
  destroyCharacterController,
  destroyCharacterUseCase,
};
