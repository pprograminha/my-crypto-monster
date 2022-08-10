import { DiskStorageProvider } from '../../../../shared/providers/implementations/DiskStorageProvider';
import { WeaponsRepository } from '../../repositories/implementations/WeaponsRepository';
import { UpdateWeaponImageController } from './UpdateWeaponImageController';
import { UpdateWeaponImageUseCase } from './UpdateWeaponImageUseCase';

const diskStorageProvider = new DiskStorageProvider();
const weaponsRepository = new WeaponsRepository();

const updateWeaponImageUseCase = new UpdateWeaponImageUseCase(diskStorageProvider, weaponsRepository);

const updateWeaponImageController = new UpdateWeaponImageController(updateWeaponImageUseCase)

export {
  updateWeaponImageController,
  updateWeaponImageUseCase,
};
