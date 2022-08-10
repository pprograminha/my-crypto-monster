import { WeaponsRepository } from '../../repositories/implementations/WeaponsRepository';
import { ListWeaponsController } from './ListWeaponsController';
import { ListWeaponsUseCase } from './ListWeaponsUseCase';

const weaponsRepository = new WeaponsRepository();

const listWeaponsUseCase = new ListWeaponsUseCase(weaponsRepository);

const listWeaponsController = new ListWeaponsController(listWeaponsUseCase)

export {
  listWeaponsController,
  listWeaponsUseCase,
};
