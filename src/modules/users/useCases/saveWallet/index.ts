import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider'
import { UsersRepository } from '../../repositories/implementations/UsersRepository'
import { SaveWalletController } from './SaveWalletController'
import { SaveWalletUseCase } from './SaveWalletUseCase'

const usersRepository = new UsersRepository()
const bcryptHashProvider = new BCryptHashProvider()

const saveWalletUseCase = new SaveWalletUseCase(usersRepository, bcryptHashProvider)

const saveWalletController = new SaveWalletController(saveWalletUseCase)

export {
  saveWalletController,
}
