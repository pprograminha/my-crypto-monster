import { SalesRepository } from '../../repositories/implementations/SalesRepository'
import { CancelSaleController } from './CancelSaleController'
import { CancelSaleUseCase } from './CancelSaleUseCase'

const salesRepository = new SalesRepository()

const cancelSaleUseCase = new CancelSaleUseCase(salesRepository)

const cancelSaleController = new CancelSaleController(cancelSaleUseCase)

export {
    cancelSaleController,
}
