import { CharactersRepository } from '../../../characters/repositories/implementations/CharactersRepository';
import { WeaponsRepository } from '../../repositories/implementations/WeaponsRepository';
import { CreateWeaponController } from './CreateWeaponController';
import { CreateWeaponUseCase } from './CreateWeaponUseCase';

const weaponsRepository = new WeaponsRepository();
const charactersRepository = new CharactersRepository();

const createWeaponUseCase = new CreateWeaponUseCase(weaponsRepository, charactersRepository);

const createWeaponController = new CreateWeaponController(createWeaponUseCase)

export {
  createWeaponController,
  createWeaponUseCase,
};
