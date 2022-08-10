import { ChestsRepository } from '../../repositories/implementations/ChestsRepository';
import { RemoveChestController } from './RemoveChestController';
import { RemoveChestUseCase } from './RemoveChestUseCase';

const chestsRepository = new ChestsRepository();

const removeChestUseCase = new RemoveChestUseCase(
  chestsRepository,
);

const removeChestController = new RemoveChestController(removeChestUseCase)

export {
  removeChestController,
  removeChestUseCase,
};
