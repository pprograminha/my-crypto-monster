import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository'
import { SalesRepository } from '../../repositories/implementations/SalesRepository'
import { ListSalesController } from './ListSalesController'
import { ListSalesUseCase } from './ListSalesUseCase'

const salesRepository = new SalesRepository()
const usersRepository = new UsersRepository()

const listSalesUseCase = new ListSalesUseCase(salesRepository, usersRepository)

const listSalesController = new ListSalesController(listSalesUseCase)

export {
    listSalesController,
}
