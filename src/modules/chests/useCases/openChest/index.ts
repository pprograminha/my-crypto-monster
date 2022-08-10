import { CharactersRepository } from '../../../characters/repositories/implementations/CharactersRepository';
import { UserCharactersRepository } from '../../../characters/repositories/implementations/UserCharactersRepository';
import { CreateUserCharacterUseCase } from '../../../characters/useCases/createUserCharacter/CreateUserCharacterUseCase';
import { LogsRepository } from '../../../logs/repositories/implementations/LogsRepositories';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { UserWeaponsRepository } from '../../../weapons/repositories/implementations/UserWeaponsRepository';
import { WeaponsRepository } from '../../../weapons/repositories/implementations/WeaponsRepository';
import { CreateUserWeaponUseCase } from '../../../weapons/useCases/createUserWeapon/CreateUserWeaponUseCase';
import { ChestsRepository } from '../../repositories/implementations/ChestsRepository';
import { OpenChestController } from './OpenChestController';
import { OpenChestUseCase } from './OpenChestUseCase';

const chestsRepository = new ChestsRepository();
const usersRepository = new UsersRepository();
const charactersRepository = new CharactersRepository();
const weaponsRepository = new WeaponsRepository();
const userCharactersRepository = new UserCharactersRepository();
const userWeaponsRepository = new UserWeaponsRepository();
const createUserCharacterUseCase = new CreateUserCharacterUseCase(userCharactersRepository)
const createUserWeaponUseCase = new CreateUserWeaponUseCase(userWeaponsRepository)
const logsRepository = new LogsRepository()

const openChestUseCase = new OpenChestUseCase(
  chestsRepository,
  usersRepository,
  charactersRepository,
  weaponsRepository,
  createUserCharacterUseCase,
  createUserWeaponUseCase,
  logsRepository
);

const openChestController = new OpenChestController(openChestUseCase)

export {
  openChestController,
  openChestUseCase,
};
