import { UpdateCharacterImageController } from './UpdateCharacterImageController';
import { UpdateCharacterImageUseCase } from './UpdateCharacterImageUseCase';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { CharactersRepository } from '../../repositories/implementations/CharactersRepository';
import { DiskStorageProvider } from '../../../../shared/providers/implementations/DiskStorageProvider';

const diskStorageProvider = new DiskStorageProvider();
const charactersRepository = new CharactersRepository();

const updateCharacterImageUseCase = new UpdateCharacterImageUseCase(diskStorageProvider, charactersRepository);

const updateCharacterImageController = new UpdateCharacterImageController(updateCharacterImageUseCase)

export {
  updateCharacterImageController,
  updateCharacterImageUseCase,
}