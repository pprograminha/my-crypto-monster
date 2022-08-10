import { DisableUserController } from './DisableUserController'
import { DisableUserUseCase } from './DisableUserUseCase'
import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider'
import { UsersRepository } from '../../repositories/implementations/UsersRepository'

const usersRepository = new UsersRepository()

const disableUserUseCase = new DisableUserUseCase(usersRepository)

const disableUserController = new DisableUserController(disableUserUseCase)

export {
  disableUserController,
}