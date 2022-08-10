import { UserWeaponsRepository } from '../../repositories/implementations/UserWeaponsRepository';
import { CreateUserWeaponController } from './CreateUserWeaponController';
import { CreateUserWeaponUseCase } from './CreateUserWeaponUseCase';

const userWeaponsRepository = new UserWeaponsRepository();

const createUserWeaponUseCase = new CreateUserWeaponUseCase(userWeaponsRepository);

const createUserWeaponController = new CreateUserWeaponController(createUserWeaponUseCase)

export {
  createUserWeaponController,
  createUserWeaponUseCase,
};
