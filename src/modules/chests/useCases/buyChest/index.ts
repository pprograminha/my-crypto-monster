import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider';
import { Web3jsBlockchainProvider } from '../../../../shared/providers/implementations/Web3jsBlockchainProvider';
import { LogsRepository } from '../../../logs/repositories/implementations/LogsRepositories';
import { TransactionsRepository } from '../../../logs/repositories/implementations/TransactionsRepositories';
import { PremiumPassesRepository } from '../../../premium_passes/repositories/implementations/PremiumPassesRepository';
import { PurchasesRepository } from '../../../sales/repositories/implementations/PurchasesRepository';
import { SalesRepository } from '../../../sales/repositories/implementations/SalesRepository';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { ChestsRepository } from '../../repositories/implementations/ChestsRepository';
import { CreateChestUseCase } from '../createChest/CreateChestUseCase';
import { BuyChestController } from './BuyChestController';
import { BuyChestUseCase } from './BuyChestUseCase';

const usersRepository = new UsersRepository();
const salesRepository = new SalesRepository();
const logsRepository = new LogsRepository()
const transactionsRepository = new TransactionsRepository()
const premiumPassesRepository = new PremiumPassesRepository()
const bcryptHashProvider = new BCryptHashProvider()
const purchasesRepository = new PurchasesRepository()
const web3jsBlockchainProvider = new Web3jsBlockchainProvider(bcryptHashProvider, transactionsRepository)
const chestsRepository = new ChestsRepository();
const createChestUseCase = new CreateChestUseCase(chestsRepository, usersRepository);

const buyChestUseCase = new BuyChestUseCase(
  salesRepository,
  usersRepository,
  createChestUseCase,
  logsRepository, 
  web3jsBlockchainProvider,
  premiumPassesRepository,
  purchasesRepository
);

const buyChestController = new BuyChestController(buyChestUseCase)

export {
  buyChestController,
  buyChestUseCase,
};
