import { CreateCharacterController } from './CreateCharacterController';
import { CreateCharacterUseCase } from './CreateCharacterUseCase';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { CharactersRepository } from '../../repositories/implementations/CharactersRepository';

const charactersRepository = new CharactersRepository();

const createCharacterUseCase = new CreateCharacterUseCase(charactersRepository);

const createCharacterController = new CreateCharacterController(createCharacterUseCase)

export {
  createCharacterController,
  createCharacterUseCase,
}