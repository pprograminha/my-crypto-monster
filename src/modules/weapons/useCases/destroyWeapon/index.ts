import { UserWeaponsRepository } from '../../repositories/implementations/UserWeaponsRepository';
import { WeaponsRepository } from '../../repositories/implementations/WeaponsRepository';
import { DestroyWeaponController } from './DestroyWeaponController';
import { DestroyWeaponUseCase } from './DestroyWeaponUseCase';

const weaponsRepository = new WeaponsRepository();
const userWeaponsRepository = new UserWeaponsRepository();

const destroyWeaponUseCase = new DestroyWeaponUseCase(weaponsRepository, userWeaponsRepository);

const destroyWeaponController = new DestroyWeaponController(destroyWeaponUseCase)

export {
  destroyWeaponController,
  destroyWeaponUseCase,
};
