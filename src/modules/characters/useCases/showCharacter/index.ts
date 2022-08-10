import { CharactersRepository } from '../../repositories/implementations/CharactersRepository';
import { ShowCharacterController } from './ShowCharacterController';
import { ShowCharacterUseCase } from './ShowCharacterUseCase';

const charactersRepository = new CharactersRepository();

const showCharacterUseCase = new ShowCharacterUseCase(charactersRepository);

const showCharacterController = new ShowCharacterController(showCharacterUseCase)

export {
  showCharacterController,
  showCharacterUseCase,
};
