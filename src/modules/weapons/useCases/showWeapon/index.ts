import { WeaponsRepository } from '../../repositories/implementations/WeaponsRepository';
import { ShowWeaponController } from './ShowWeaponController';
import { ShowWeaponUseCase } from './ShowWeaponUseCase';

const weaponsRepository = new WeaponsRepository();

const showWeaponUseCase = new ShowWeaponUseCase(weaponsRepository);

const showWeaponController = new ShowWeaponController(showWeaponUseCase)

export {
  showWeaponController,
  showWeaponUseCase,
};
