import { CharactersRepository } from '../../repositories/implementations/CharactersRepository';
import { ListCharactersController } from './ListCharactersController';
import { ListCharactersUseCase } from './ListCharactersUseCase';

const charactersRepository = new CharactersRepository();

const listCharactersUseCase = new ListCharactersUseCase(charactersRepository);

const listCharactersController = new ListCharactersController(listCharactersUseCase)

export {
  listCharactersController,
  listCharactersUseCase,
};
