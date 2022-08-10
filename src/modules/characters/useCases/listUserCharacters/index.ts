import { CharactersRepository } from '../../repositories/implementations/CharactersRepository';
import { UserCharactersRepository } from '../../repositories/implementations/UserCharactersRepository';
import { ListUserCharactersController } from './ListUserCharactersController';
import { ListUserCharactersUseCase } from './ListUserCharactersUseCase';

const userCharactersRepository = new UserCharactersRepository();

const listUserCharactersUseCase = new ListUserCharactersUseCase(userCharactersRepository);

const listUserCharactersController = new ListUserCharactersController(listUserCharactersUseCase)

export {
  listUserCharactersController,
  listUserCharactersUseCase,
};
