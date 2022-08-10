import { UserWeaponsRepository } from '../../repositories/implementations/UserWeaponsRepository';
import { ListUserWeaponsController } from './ListUserWeaponsController';
import { ListUserWeaponsUseCase } from './ListUserWeaponsUseCase';

const userWeaponsRepository = new UserWeaponsRepository();

const listUserWeaponsUseCase = new ListUserWeaponsUseCase(userWeaponsRepository);

const listUserWeaponsController = new ListUserWeaponsController(listUserWeaponsUseCase)

export {
  listUserWeaponsController,
  listUserWeaponsUseCase,
};
