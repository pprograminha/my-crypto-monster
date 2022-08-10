import { CreatePremiumPassController } from './CreatePremiumPassController'
import { CreatePremiumPassUseCase } from './CreatePremiumPassUseCase'
import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider'
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository'
import { PremiumPassesRepository } from '../../repositories/implementations/PremiumPassesRepository'

const premiumPassesRepository = new PremiumPassesRepository()
const usersRepository = new UsersRepository()

const createPremiumPassUseCase = new CreatePremiumPassUseCase(usersRepository, premiumPassesRepository)

const createPremiumPassController = new CreatePremiumPassController(createPremiumPassUseCase)

export {
  createPremiumPassController,
  createPremiumPassUseCase,
}