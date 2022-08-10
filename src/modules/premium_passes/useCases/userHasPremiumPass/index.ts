import { UserHasPremiumPassController } from './UserHasPremiumPassController'
import { UserHasPremiumPassUseCase } from './UserHasPremiumPassUseCase'
import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider'
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository'
import { PremiumPassesRepository } from '../../repositories/implementations/PremiumPassesRepository'

const premiumPassesRepository = new PremiumPassesRepository()
const usersRepository = new UsersRepository()

const userHasPremiumPassUseCase = new UserHasPremiumPassUseCase(usersRepository, premiumPassesRepository)

const userHasPremiumPassController = new UserHasPremiumPassController(userHasPremiumPassUseCase)

export {
  userHasPremiumPassController,
  userHasPremiumPassUseCase,
}