import { SalesRepository } from '../../repositories/implementations/SalesRepository';
import { ShowSaleController } from './ShowSaleController';
import { ShowSaleUseCase } from './ShowSaleUseCase';

const salesRepository = new SalesRepository();

const showSaleUseCase = new ShowSaleUseCase(salesRepository);

const showSaleController = new ShowSaleController(showSaleUseCase)

export {
  showSaleController,
  showSaleUseCase,
};
