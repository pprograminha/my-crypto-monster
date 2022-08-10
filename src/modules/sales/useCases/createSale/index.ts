import { PremiumPassesRepository } from '../../../premium_passes/repositories/implementations/PremiumPassesRepository'
import { MakePremiumPassesValidUseCase } from '../../../premium_passes/useCases/makePremiumPassesValid/MakePremiumPassesValidUseCase'
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository'
import { SalesRepository } from '../../repositories/implementations/SalesRepository'
import { CreateSaleController } from './CreateSaleController'
import { CreateSaleUseCase } from './CreateSaleUseCase'

const salesRepository = new SalesRepository()
const usersRepository = new UsersRepository()
const premiumPassesRepository = new PremiumPassesRepository()
const makePremiumPassesValidUseCase = new MakePremiumPassesValidUseCase(usersRepository, premiumPassesRepository)

const createSaleUseCase = new CreateSaleUseCase(salesRepository, makePremiumPassesValidUseCase)

const createSaleController = new CreateSaleController(createSaleUseCase)

export {
    createSaleController,
}
