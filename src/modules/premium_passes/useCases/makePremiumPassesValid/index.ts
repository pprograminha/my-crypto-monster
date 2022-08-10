import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository'
import { PremiumPassesRepository } from '../../repositories/implementations/PremiumPassesRepository'
import { MakePremiumPassesValidController } from './MakePremiumPassesValidController'
import { MakePremiumPassesValidUseCase } from './MakePremiumPassesValidUseCase'

const premiumPassesRepository = new PremiumPassesRepository()
const usersRepository = new UsersRepository()

const makePremiumPassesValidUseCase = new MakePremiumPassesValidUseCase(usersRepository, premiumPassesRepository)

const makePremiumPassesValidController = new MakePremiumPassesValidController(makePremiumPassesValidUseCase)

export {
    makePremiumPassesValidController,
    makePremiumPassesValidUseCase,
}
