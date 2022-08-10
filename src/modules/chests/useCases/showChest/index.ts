import { ChestsRepository } from '../../repositories/implementations/ChestsRepository';
import { ShowChestController } from './ShowChestController';
import { ShowChestUseCase } from './ShowChestUseCase';

const chestsRepository = new ChestsRepository();

const showChestUseCase = new ShowChestUseCase(
  chestsRepository,
);

const showChestController = new ShowChestController(showChestUseCase)

export {
  showChestController,
  showChestUseCase,
};
