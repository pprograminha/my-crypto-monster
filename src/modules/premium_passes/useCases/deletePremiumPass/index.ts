import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository'
import { PremiumPassesRepository } from '../../repositories/implementations/PremiumPassesRepository'
import { DeletePremiumPassController } from './DeletePremiumPassController'
import { DeletePremiumPassUseCase } from './DeletePremiumPassUseCase'

const premiumPassesRepository = new PremiumPassesRepository()
const usersRepository = new UsersRepository()

const deletePremiumPassUseCase = new DeletePremiumPassUseCase(usersRepository, premiumPassesRepository)

const deletePremiumPassController = new DeletePremiumPassController(deletePremiumPassUseCase)

export {
  deletePremiumPassController,
  deletePremiumPassUseCase,
}
